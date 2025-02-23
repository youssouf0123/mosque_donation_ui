// import { Component, OnInit, forwardRef } from '@angular/core';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

import { Product } from '../../model/product.interface'
import { ProductService } from '../../services/product.service';

import { MatTableDataSource } from '@angular/material/table';

// import { FormControl } from '@angular/forms';

import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order-service-info',
  templateUrl: './order-service-info.component.html',
  styleUrls: ['./order-service-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrderServiceInfoComponent),
      multi: true
    }
  ]
})
export class OrderServiceInfoComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {

  // https://stackblitz.com/edit/angular-reactive-form-sobsoft

  // Changed strict mode to false in tsconfig.json
  // https://github.com/vaibhavphutane/Inline-editable-table-angular9/tree/master/src/app

  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;

  loadedProducts: any;
  productList: Product[];

  tableDataSource: MatTableDataSource<AbstractControl>;

  displayedColumns = ['product', 'description', 'unit_price', 'quantity', 'total'];

  /** control for the MatSelect filter keyword */
  public prdctFilterCtrl: FormControl = new FormControl();

  /** list of products filtered by search keyword */
  public filteredProducts: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);

  @ViewChild(MatSelect) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {

    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();

    this.productService.getProducts().subscribe((data: Product[]) => {

      this.productList = data;

      // load the initial product list
      this.filteredProducts.next(this.productList.slice());

      // listen for search field value changes
      this.prdctFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterProducts();
        });

      this.loadedProducts = data.reduce(function (map, obj) {
        map[obj.id] = obj;
        return map;
      }, {});
    });

    this.tableDataSource = new MatTableDataSource((this.getFormControls.controls));
  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  ngOnDestroy(): void {

    // this.myFormValueChanges$.unsubscribe();
    // todo: unsuscribe observable events here such as savedChanges.
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      product: ['', Validators.required],
      description: ['', [Validators.email, Validators.required]],
      unit_price: ['', [Validators.required]],
      quantity: [''],
      total: ['', [Validators.required, Validators.maxLength(10)]],
      isEditable: [true]
    });
  }


  /**
   * Sets the initial value after the filteredProducts are loaded initially
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
        this.singleSelect.compareWith = (a: Product, b: Product) => a && b && a.id === b.id;
      });
  }

  protected filterProducts() {

    if (!this.productList) {
      return;
    }

    // get the search keyword
    let search = this.prdctFilterCtrl.value;

    // console.log('search keyword: ' + search);

    if (!search) {
      this.filteredProducts.next(this.productList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProducts.next(
      this.productList.filter(prdct => prdct.name.toLowerCase().indexOf(search) > -1)
    );
  }

  addRow() {

    const control = this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());

    if (this.tableDataSource) {
      this.tableDataSource._updateChangeSubscription()
    }

  }

  onSelectionChange($evt, element, i) {

    const prdct = this.loadedProducts[$evt.value];

    // console.log($evt);
    // console.log(element);
    // console.log(i);
    // console.log(prdct);

    element.setValue({
      product: $evt.value,
      description: prdct.description,
      unit_price: prdct.price,
      quantity: 1, //prdct.quantity, 
      total: 1 * prdct.price, //prdct.price * prdct.quantity,
      isEditable: true,
    }, { emitEvent: true });

  }

  deleteRow(index: number) {
    const control = this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
    val && this.userTable.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    // console.log("on change");
    this.userTable.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    // console.log("on blur");
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.userTable.disable() : this.userTable.enable();
  }

}