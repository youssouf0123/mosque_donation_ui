import {
	Component,
	EventEmitter,
	Inject,
	Input,
	LOCALE_ID,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
} from "@angular/core"
import { CurrencyPipe, getLocaleCurrencyName } from "@angular/common"
import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http"

import { CheckoutSettings, CheckoutType } from "../custom-add-to-cart/types"
//import { CartService } from './services/cart.service';
import { CartService } from "ng-shopping-cart"

import { CheckoutPaypalSettings } from "../custom-add-to-cart/interfaces/checkout-paypal-settings"
import { CheckoutHttpSettings } from "../custom-add-to-cart/interfaces/checkout-http-settings"
import { LocaleFormat } from "../custom-add-to-cart/interfaces/locale-format"
import { parseLocaleFormat } from "../custom-add-to-cart/locales"
import { FormGroup } from "@angular/forms"

import { Order } from "../../model/order.model"
import { ProductService } from "src/app/services/product.service"
import { ProductInfosComponent } from "src/app/material-component/product-infos/product-infos.component"
import { MatDialog } from "@angular/material/dialog"

import { HttpHeaders } from "@angular/common/http"

import { environment } from "../../../environments/environment"

/**
 * Renders a button to initiate checkout of the cart.
 *
 * @order 6
 * @howToUse "With a custom button or projected content"
 * ```html
 * <cart-checkout [custom]="true">
 *    <button type="button" class="my-custom-class">Do checkout</button>
 * </cart-checkout>
 * ```
 *
 * @howToUse "With different text and classes"
 * ```html
 * <cart-checkout [buttonText]="'Add item'" [buttonClass]="'my-custom-class'">
 * </cart-checkout>
 * ```
 *
 * @howToUse "Using http in a protected endpoint"
 * ```html
 * <cart-checkout [service]="'http'" [settings]="settings">
 * </cart-checkout>
 * ```
 * ```typescript
 * export class MyComponent {
 *   settings: CheckoutHttpSettings = {
 *     method: 'POST',
 *     url: 'http://myapi.com/',
 *     options: { headers: { Authorization: 'Bearer my-auth-token' } }
 *   };
 * }
 * ```
 *
 * @howToUse "Using the PayPal service"
 * ```html
 * <cart-checkout [service]="'paypal'" settings="settings">
 * </cart-checkout>
 * ```
 * ```typescript
 * export class MyComponent {
 *  settings: CheckoutPaypalSettings = {
 *    business: 'myaccount@paypal.com',
 *    itemName: 'myMarketplaceAppCart',
 *    itemNumber: '1234',
 *    serviceName: 'MyBusiness',
 *    country: 'US'
 *  };
 * }
 * ```
 *
 * @note {warning} This component captures clicks events bubbling from its projected content. Make sure the event keeps bubbling only when
 * you want the checkout operation to start.
 *
 * @note {warning} When the `[service]` is set to `paypal` an actual PayPal button is rendered. None of the inputs `custom`, `buttonText`
 * or `buttonClass` have any effect.
 */
@Component({
	selector: "custom-cart-checkout",
	templateUrl: "./custom-cart-checkout.component.html",
	styleUrls: ["./custom-cart-checkout.component.css"],
})
export class CustomCartCheckoutComponent
	implements OnChanges, OnInit, OnDestroy
{
	private _serviceSubscription: any
	private getLocaleCurrencyName: any
	empty = true
	cost = 0
	taxRate = 0
	shipping = 0
	name: string | undefined
	quantity: number = 0
	price: number = 0.0

	// made httpSettings an @Input, since the original checkout button was not working
	@Input() httpSettings: CheckoutHttpSettings

	paypalSettings: CheckoutPaypalSettings
	format: LocaleFormat
	currency = "USD"
	paypalLocale = "en"

	@Input() userForm: FormGroup
	@Input() isAddMode: boolean

	/**
	 * If `false` displays a default button provided by the component. When set to `true` projects the contents of the component.
	 */
	@Input() custom = false
	/**
	 * Changes the default text of the component's button.
	 */
	@Input() buttonText = "Checkout"
	/**
	 * Changes the default text of the component's button.
	 */
	@Input() buttonClass = "cart-checkout-button"
	/**
	 * Sets the type of service to be used when initiating the checkout.
	 */
	@Input() service: CheckoutType = "log"
	/**
	 * Depending on the type of the service you might need to add some configuration to it. This input allows you to change that
	 * configuration.
	 */
	@Input() settings: CheckoutSettings = null
	/**
	 * Changes currency display format for the component. Overrides the value set from the service using `setCurrencyFormat`.
	 */
	@Input() localeFormat: string
	/**
	 * Emits the result of the checkout operation. If the service is set to `'log'` it emits the entire cart object including tax rates and
	 * shipping info. If is set to `'http'` it emits an `HttpResponse` object with body, headers, etc as it was received by the remote server.
	 *
	 * > When `[service]` is set to `'paypal'` this event is never emitted.
	 */
	@Output() checkout = new EventEmitter<any>()
	/**
	 * When the `[service]` is set to `'http'` and the checkout operation fails the thrown error can be captured using this output.
	 *
	 * The emitted value is the complete `HttpErrorResponse` object returned by `HttpClient` so you can inspect other properties like status
	 * codes, headers, messages, etc.
	 */
	@Output() error = new EventEmitter<any>()

	private apiServerUrl = environment.apiUrl

	constructor(
		private cartService: CartService<any>,
		private productService: ProductService,
		public dialog: MatDialog,
		private httpClient: HttpClient,
		@Inject(LOCALE_ID) private locale: string,
	) {
		this.getLocaleCurrencyName = getLocaleCurrencyName
	}

	ngOnInit(): void {
		this.updateCart(true)
		this._serviceSubscription = this.cartService.onChange.subscribe((evt) =>
			this.updateCart(evt.change === "format"),
		)
	}

	private updateCart(formatChange) {
		this.empty = this.cartService.isEmpty()
		this.cost = this.cartService.cost()
		this.taxRate = this.cartService.getTaxRate()
		this.shipping = this.cartService.getShipping()
		if (formatChange) {
			this.updateLocale()
		}
	}

	private updateLocale() {
		this.format = this.localeFormat
			? parseLocaleFormat(this.localeFormat)
			: <LocaleFormat>this.cartService.getLocaleFormat(true)
		const loc = this.format.locale || this.locale
		this.paypalLocale = loc.substring(0, 2)
		this.currency = this.format.currencyCode || this.getCurrency(loc)
	}

	private getCurrency(locale) {
		const currencyCode = this.getLocaleCurrencyName(locale)
		if (!currencyCode) {
			return "USD"
		}
		if (currencyCode.length === 3) {
			return currencyCode
		}
		// Angular < 6 return "US Dollar" instead of "USD" so we have to hack the code using the currency pipe
		// You will also get USD on locales where you should get EUR so for those versions currencyCode must be used
		const fmt = new CurrencyPipe(locale)
		const val = fmt.transform(0, undefined, "code", "1.0-0", locale)
		const pre = val.startsWith("0")
		return val.substr(pre ? -3 : 0, 3)
	}

	doCheckout() {
		this.productService.getProducts().subscribe((products) => {
			let cart: any = this.cartService.toObject()
			for (let item of cart.items) {
				for (let product of products) {
					if (item.id === product.id) {
						if (item.quantity > product.quantity) {
							this.name = product.name
							this.quantity = product.quantity
							this.price = product.price
							const dialogRef = this.dialog.open(ProductInfosComponent, {
								width: "800px",
								data: {
									name: this.name,
									quantity: this.quantity,
									price: this.price,
								},
							})
							return
						}
						break
					}
				}
			}

			switch (this.service) {
				case "log":
					console.debug(cart)
					this.checkout.emit(cart)
					break

				case "http":
					//					return this.httpClient.get<any>(
					//						`${this.apiServerUrl}/returns/downloadPDF/${returnId}`,
					//						httpClientOptions,
					//					)

					if (!this.settings) {
						throw new Error("Missing settings configuration")
					}

					if (this.isAddMode) {
						this.httpSettings = {
							//		"url": 'http://myapi.com/',
							url: `${this.apiServerUrl}/orders/add`,
							method: "POST",
							options: {
								headers: new HttpHeaders({
									//				'Content-Type': 'application/json'
									Authorization: "Bearer my-auth-token",
								}),
							},
						}
						//	this.createUser();
					} else {
						this.httpSettings = {
							url: `${this.apiServerUrl}/orders/update`,
							method: "PUT",
							options: {
								headers: new HttpHeaders({
									//				'Content-Type': 'application/json'
									Authorization: "Bearer my-auth-token",
								}),
							},
						}
						//	this.updateUser();
					}

					console.debug(this.userForm.value)

					const customerOrder = new Order({
						customer: this.userForm.value,
						cart: cart,
					})

					this.userForm.reset()
					this.cartService.clear()

					console.debug(customerOrder)

					this.httpSettings.body = customerOrder

					const verbs = ["POST", "PUT", "PATCH"]
					const { url, method = "POST", options, body } = this.httpSettings
					const methodUpper = method.toUpperCase()
					if (verbs.indexOf(methodUpper) === -1) {
						throw new Error(
							`Invalid http verb found in method setting. Expected one of ${verbs.join(
								" ",
							)} and got ${method}`,
						)
					}
					if (body) {
						cart =
							typeof body === "function"
								? body(cart)
								: Object.assign({}, cart, body)
					}
					if (
						options &&
						options.headers &&
						options.headers.has("Content-Type")
					) {
						const contentType = options.headers.get("Content-Type")
						if (contentType.startsWith("application/x-www-form-urlencoded")) {
							cart = new HttpParams({ fromObject: cart })
						}
					}
					console.debug(this.httpSettings)

					this.httpClient
						.request(new HttpRequest(methodUpper, url, cart, options))
						.toPromise()
						.then((response) => {
							this.checkout.emit(response)
							this.userForm.reset()
							this.cartService.clear()
						})
						.catch((err) => {
							this.error.emit(err)
						})
					break
			}
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["settings"] && changes["settings"].currentValue) {
			const hasOwn = Object.prototype.hasOwnProperty
			const value = changes["settings"].currentValue
			if (hasOwn.call(value, "business")) {
				this.paypalSettings = changes["settings"].currentValue
			}
			if (hasOwn.call(value, "url")) {
				this.httpSettings = changes["settings"].currentValue
			}
		}
		if (changes["localeFormat"]) {
			this.updateLocale()
		}
	}

	ngOnDestroy(): void {
		this._serviceSubscription.unsubscribe()
	}
}
