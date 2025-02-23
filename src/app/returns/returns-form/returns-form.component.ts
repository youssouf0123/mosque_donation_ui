import { Component, OnInit, ViewChild } from "@angular/core"

import {
	FormBuilder,
	FormGroup,
	FormArray,
	Validators,
	ControlContainer,
} from "@angular/forms"
import { FormControl, AbstractControl } from "@angular/forms"

import { Product } from "../../model/product.interface"
import { ProductService } from "../../services/product.service"

import { MatTableDataSource } from "@angular/material/table"

import { MatSelect } from "@angular/material/select"
import { ReplaySubject, Subject } from "rxjs"
import { take, takeUntil } from "rxjs/operators"
import { OrderService } from "../../services/order.service"
import { ReturnService } from "../../services/return.service"

import { first } from "rxjs/operators"

import { MatDialog } from "@angular/material/dialog"

import { AlertDialogComponent } from "../alert-dialog/alert-dialog.component"
import { Router } from "@angular/router"
import { Order } from "src/app/model/order.model"

@Component({
	selector: "returns-form",
	templateUrl: "./returns-form.component.html",
	styleUrls: ["./returns-form.component.css"],
})
export class ReturnsFormComponent implements OnInit {
	// https://stackblitz.com/edit/angular-reactive-form-sobsoft

	// Changed strict mode to false in tsconfig.json
	// https://github.com/vaibhavphutane/Inline-editable-table-angular9/tree/master/src/app

	returnedItemsForm: FormGroup

	tableDataSource: MatTableDataSource<AbstractControl>

	displayedColumns = [
		"id",
		//		'name',
		"quantity",
		"price",
		"total",
		"delete",
	]

	loadedProducts: any

	productList: Product[]

	/** control for the MatSelect filter keyword */
	public prdctFilterCtrl: FormControl = new FormControl()

	/** list of products filtered by search keyword */
	public filteredProducts: ReplaySubject<Product[]> = new ReplaySubject<
		Product[]
	>(1)

	@ViewChild(MatSelect) singleSelect: MatSelect

	/** Subject that emits when the component has been destroyed. */
	protected _onDestroy = new Subject<void>()

	my_order_id: number = -1

	constructor(
		private fb: FormBuilder,
		public dialog: MatDialog,
		private productService: ProductService,
		private orderService: OrderService,
		private returnService: ReturnService,
		private _router: Router,
	) {}

	ngOnInit(): void {
		this.returnedItemsForm = this.fb.group({
			orderId: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
			//			orderDate: ['', [Validators.required]],
			tableRows: this.fb.array([]),
		})

		//		this.addRow();

		//		this.loadProducts();

		this.tableDataSource = new MatTableDataSource(this.getFormControls.controls)
	}

	ngOnDestroy(): void {
		// this.myFormValueChanges$.unsubscribe();
		// todo: unsuscribe observable events here such as savedChanges.
		this._onDestroy.next()
		this._onDestroy.complete()
	}

	ngAfterViewInit() {
		//		this.setInitialValue();
	}

	submitForm() {
		console.debug(this.returnedItemsForm.value)

		if (!this.returnedItemsForm.valid) {
			console.debug("form is invalid!")
			this.openDialog("Form is Invalid. Please correct and try again!")
			false
		} else {
			console.debug("Form is valid. Processing Return!")
			this.returnService
				.processReturns(this.returnedItemsForm.value)
				.subscribe((response) => {
					console.debug(response)
					if (response.quantity !== undefined) {
						let remainQty = response.name.split("###")
						console.log(remainQty)
						if (
							Number(remainQty[3]) > Number(remainQty[1]) &&
							Number(remainQty[2]) === 0
						) {
							this.openDialog(
								remainQty[1] +
									" Quantity of " +
									remainQty[0] +
									" was ordered, so you cannot return more than " +
									remainQty[1] +
									" Quantity",
							)
						} else if (Number(remainQty[1]) - Number(remainQty[2]) === 0) {
							this.openDialog(
								remainQty[1] +
									" Quantity of " +
									remainQty[0] +
									" was ordered and you have already returned " +
									remainQty[1] +
									", so there is nothing else to be returned",
							)
						} else {
							this.openDialog(
								remainQty[1] +
									" Quantity of " +
									remainQty[0] +
									" was ordered and you have already returned " +
									remainQty[2] +
									", so you cannot return more than " +
									(remainQty[1] - remainQty[2]) +
									" Quantity",
							)
						}
					} else {
						this.returnedItemsForm.reset()
						this._router.navigateByUrl("/returns-history")
					}
				})
		}
	}

	initiateForm(): FormGroup {
		return this.fb.group({
			id: ["", Validators.required],
			name: ["", [Validators.required]],
			quantity: [""],
			price: ["", [Validators.required]],
			total: ["", [Validators.required, Validators.maxLength(10)]], //,
			//			isEditable: [true]
		})
	}

	openDialog(msg: string): void {
		let dialogRef = this.dialog.open(AlertDialogComponent, {
			width: "250px",
			data: { message: msg },
		})

		//		dialogRef.afterClosed().subscribe(result => {
		//			this.animal = result;
		//		});
	}

	loadProducts(productNames: string[]): void {
		console.debug("calling loadProducts()")

		this.productService.getProducts().subscribe((data: Product[]) => {
			//			this.productList = data;

			this.productList = data.filter((entry) => {
				return productNames.includes(entry.name)
			})

			// load the initial product list
			this.filteredProducts.next(this.productList.slice())

			// listen for search field value changes
			this.prdctFilterCtrl.valueChanges
				.pipe(takeUntil(this._onDestroy))
				.subscribe(() => {
					this.filterProducts()
				})

			this.loadedProducts = data.reduce(function (map, obj) {
				map[obj.id] = obj
				return map
			}, {})
		})
	}

	addRow() {
		const control = this.returnedItemsForm.get("tableRows") as FormArray

		control.push(this.initiateForm())

		if (this.tableDataSource) {
			this.tableDataSource._updateChangeSubscription()
		}
	}

	onOrderIdEntry($evt) {
		const orderId = $evt.target.value
		this.my_order_id = orderId
		//		console.debug(orderId);

		const orderIdControl = this.returnedItemsForm.get("orderId") as FormControl

		if (orderId != "" && orderIdControl.valid) {
			//			this.orderService.findConfirmedOrderById(orderId)
			this.orderService.findOrderByIdForEdit(orderId, "CONFIRMED").subscribe(
				(res) => {
					const productNames: string[] = []
					res.cart.items.forEach((entry) => {
						productNames.push(entry.name)
						// console.debug(entry)
					})
					// console.log(productNames)
					this.loadProducts(productNames)
				},
				(err) => {
					this.openDialog(
						"Invalid Request. Please Enter an Order ID for an Order that has been CONFIRMED!",
					)
					console.debug(err)
					this.productList = [] // todo: effect not immediate. find solution
				},
			)
		} else {
			console.debug("invalid orderId!")
			if (orderId != "") {
				this.openDialog("Invalid 	!")
			}
		}
	}
	onSelectionChange($evt, element, i) {
		const prdct = this.loadedProducts[$evt.value]
		const control = this.returnedItemsForm.get("tableRows") as FormArray
		let isProductExist = false
		for (let i = 0; i < control.length; i++) {
			if (control.value[i].name === prdct.name) {
				isProductExist = true
				break
			}
		}
		element.setValue(
			{
				id: $evt.value,
				name: prdct.name,
				price: prdct.price * -1.0,
				quantity: 1, //prdct.quantity,
				total: -1.0 * prdct.price, //prdct.price * prdct.quantity,
				//			isEditable: true,
			},
			{ emitEvent: true },
		)
		if (isProductExist) {
			for (let i = 0; i < control.length; i++) {
				if (this.check(control.value[i], element.value)) {
					control.removeAt(i)
					this.openDialog(
						element.value.name +
							" already exists, please just change its quantity \ninstead of duplicating it.",
					)
					break
				}
			}
			if (this.tableDataSource) {
				this.tableDataSource._updateChangeSubscription()
			}
		}
	}

	onQuantityChange($evt, element, i) {
		const prdct = element.value
		this.orderService
			.findConfirmedOrderById(this.my_order_id)
			.subscribe((order: Order) => {
				console.log(order)
			})
		element.patchValue(
			{
				quantity: $evt.target.value,
				price: prdct.price,
				total: $evt.target.value * prdct.price,
				//			isEditable: true,
			},
			{ emitEvent: true },
		)
	}

	check(obj1, obj2) {
		// Iterate the obj2 using for..in
		for (let key in obj2) {
			// Check if both objects do
			// not have the equal values
			// of same key
			if (obj1[key] !== obj2[key]) {
				return false
			}
		}
		return true
	}

	deleteRow(element) {
		const control = this.returnedItemsForm.get("tableRows") as FormArray
		// console.log(control.value)
		for (let i = 0; i < control.length; i++) {
			if (this.check(control.value[i], element.value)) {
				control.removeAt(i)
				break
			}
		}
		if (this.tableDataSource) {
			this.tableDataSource._updateChangeSubscription()
		}
	}

	editRow(group: FormGroup) {
		group.get("isEditable").setValue(true)
	}

	doneRow(group: FormGroup) {
		group.get("isEditable").setValue(false)
	}

	get getFormControls() {
		const control = this.returnedItemsForm.get("tableRows") as FormArray
		return control
	}

	protected filterProducts() {
		if (!this.productList) {
			return
		}

		// get the search keyword
		let search = this.prdctFilterCtrl.value

		// console.log('search keyword: ' + search);

		if (!search) {
			this.filteredProducts.next(this.productList.slice())
			return
		} else {
			search = search.toLowerCase()
		}
		this.filteredProducts.next(
			this.productList.filter(
				(prdct) => prdct.name.toLowerCase().indexOf(search) > -1,
			),
		)
	}

	/**
	 * 	Sets the initial value after the filteredProducts are loaded initially
	 */
	protected setInitialValue() {
		this.filteredProducts
			.pipe(take(1), takeUntil(this._onDestroy))
			.subscribe(() => {
				// setting the compareWith property to a comparison function
				// triggers initializing the selection according to the initial value of
				// the form control (i.e. _initializeSelection())
				// this needs to be done after the filteredProducts are loaded initially
				// and after the mat-option elements are available
				this.singleSelect.compareWith = (a: Product, b: Product) =>
					a && b && a.id === b.id
			})
	}
}
