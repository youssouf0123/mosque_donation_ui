import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup,FormControl, Validator,AbstractControl, ValidationErrors } from "@angular/forms";
@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrderInfoComponent),
      multi: true
    }
  ]
})
export class OrderInfoComponent implements OnInit, ControlValueAccessor {

  orderInfo: FormGroup;

  constructor(private fb: FormBuilder) { }

  // constructor() { }

  ngOnInit(): void {
    this.orderInfo = this.fb.group({
      referenceNumber: ['', Validators.required],
      orderNumber: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      description: ['']
    });
  
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.orderInfo.value);
  }
  
  // Overriden Methods from ControlValueAccessor

  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    val && this.orderInfo.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    // console.log("on change");
    this.orderInfo.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    // console.log("on blur");
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.orderInfo.disable() : this.orderInfo.enable();
  }

}