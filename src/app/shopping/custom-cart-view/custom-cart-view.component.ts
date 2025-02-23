import {
	Component,
	OnInit,
	OnDestroy,
	Input,
	OnChanges,
	SimpleChanges,
} from "@angular/core"
import { CartItem } from "../custom-add-to-cart/classes/cart-item"

//import { CartService } from '../custom-add-to-cart/services/cart.service';
import { CartService } from "ng-shopping-cart"

import { CartViewDisplay } from "../custom-add-to-cart/types"
import { LocaleFormat } from "../custom-add-to-cart/interfaces/locale-format"
import { parseLocaleFormat } from "../custom-add-to-cart/locales"

import * as $ from "jquery"

/**
 * Renders a view of the cart.
 *
 * @order 2
 * @howToUse "Using responsive layout"
 * ```html
 * <cart-view [display]="'responsive'">
 * </cart-view>
 * ```
 *
 * @howToUse "No images and using scrollbars on small screens"
 * ```html
 * <cart-view [images]="false" [display]="'responsive-table'">
 * </cart-view>
 * ```
 *
 * @howToUse "Using different text for headers"
 * ```html
 * <cart-view [emptyText]="headers.empty" [nameHeaderText]="headers.name" [quantityHeaderText]="headers.quantity"
 *  [priceHeaderText]="headers.quantity" [totalHeaderText]="headers.total" [taxFooterText]="footers.tax"
 *  [shippingFooterText]="footers.shipping" [totalFooterText]="footers.total"
 * >
 * </cart-view>
 * ```
 * ```typescript
 * export class MyComponent {
 *   headers = {
 *     empty: 'No items. Add some to the cart',
 *     name: 'Description',
 *     quantity: 'Amount',
 *     price: 'Cost',
 *     total: 'Total x item',
 *   }
 *   footers = {
 *     tax: 'Tax rate',
 *     shipping: 'Shipping cost',
 *     total: 'Total cost'
 *   }
 * }
 * ```
 *
 * @howToUse "Change the default empty cart content"
 * ```html
 * <cart-view [customEmptyContent]="true">
 *   <div class="my-empty-cart-view">
 *       <span style="font-size: 36px;" class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
 *       Your cart is empty
 *   </div>
 * </cart-view>
 * ```
 */

// https://stackoverflow.com/questions/56248925/keypress-event-doesnt-log-input-value-first-time-event-is-fired

@Component({
	selector: "custom-cart-view",
	templateUrl: "./custom-cart-view.component.html",
	styleUrls: ["./custom-cart-view.component.css"],
})
export class CustomCartViewComponent implements OnInit, OnChanges, OnDestroy {
	private _serviceSubscription: any
	/**
	 * Changes the appearance how the cart view displays in different screen sizes
	 */
	@Input() display: CartViewDisplay = "responsive-table"
	/**
	 * Whether to include images in the cart or not.
	 */
	@Input() images = true
	/**
	 * The text to show when the cart has no items in it.
	 */
	@Input() emptyText = "Your cart is empty"
	/**
	 * When set to `true` and the cart is empty displays the projected content of the component as the empty content.
	 */
	@Input() customEmptyContent = false
	/**
	 * The text to display in the header of the name column.
	 */
	@Input() nameHeaderText = "Name"
	/**
	 * The text to display in the header of the quantity column.
	 */
	@Input() quantityHeaderText = "Quantity"
	/**
	 * The text to display in the header of the price column.
	 */
	@Input() priceHeaderText = "Price"
	/**
	 * The text to display in the header of the total per item column.
	 */
	@Input() totalHeaderText = "Total"

	/**
	 * The text to display in the header of the delete per item column.
	 */
	@Input() deleteItemText = "Delete"

	/**
	 * The text to display in the tax section of the footer.
	 */
	@Input() taxFooterText = "Tax"
	/**
	 * The text to display in the shipping section of the footer.
	 */
	@Input() shippingFooterText = "Shipping"
	/**
	 * The text to display in the total section of the footer.
	 */
	@Input() totalFooterText = "Total"
	/**
	 * Changes currency display format for the component. Overrides the value set from the service using `setCurrencyFormat`.
	 */
	@Input() localeFormat: string
	format: LocaleFormat
	empty = true
	items: CartItem[]
	taxRate = 0
	tax = 0
	shipping = 0
	cost = 0

	constructor(private cartService: CartService<any>) {}

	update() {
		this.empty = this.cartService.isEmpty()
		this.items = this.cartService.getItems()
		this.taxRate = this.cartService.getTaxRate() / 100
		this.tax = this.cartService.getTax()
		this.shipping = this.cartService.getShipping()
		this.cost = this.cartService.totalCost()
		if (!this.localeFormat) {
			this.format = <LocaleFormat>this.cartService.getLocaleFormat(true)
		}
	}

	increase(item: CartItem) {
		item.setQuantity(item.getQuantity() + 1)
		this.cartService.addItem(item)
	}

	decrease(item: CartItem) {
		if (item.getQuantity() > 1) {
			item.setQuantity(item.getQuantity() - 1)
			this.cartService.addItem(item)
		}
		// todo: why was this commented out?
		// else
		// {
		// 	this.cartService.removeItem(item.getId());
		// }
	}

	delete(item: CartItem) {
		console.debug("deleting item!")
		this.cartService.removeItem(item.getId())
	}
	focusOutEvent($event: any, item: CartItem) {
		if (!$event.target.value) {
			item.setQuantity(Number(0))
			this.cartService.addItem(item)
		}
	}

	updateQuantity($event: any, item: CartItem) {
		if (!$event.target.value) {
			console.log(!$event.target.value)
			item.setQuantity(Number(0))
			this.cartService.addItem(item)
			return
		} else if (item.getQuantity() >= 0) {
			item.setQuantity(Number($event.target.value))
			this.cartService.addItem(item)
		}
		// else
		// {
		// 	console.debug("removing item")
		// 	this.cartService.removeItem(item.getId())
		// }
	}

	ngOnInit(): void {
		//		$(document).ready(function() {
		//			$('input').bind('change keydown keyup', function() {
		//				/// do your thing here.
		//				//  use $(this).val() instead e.target.value
		//				console.log($(this));
		//				console.log($(this).val());
		//			});
		//		});
		this.cartService.setTaxRate(0)
		this.update()
		this._serviceSubscription = this.cartService.onChange.subscribe(() => {
			this.update()
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["localeFormat"]) {
			this.format = this.localeFormat
				? parseLocaleFormat(this.localeFormat)
				: <LocaleFormat>this.cartService.getLocaleFormat(true)
		}
	}

	ngOnDestroy(): void {
		this._serviceSubscription.unsubscribe()
	}
}
