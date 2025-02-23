import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
 
  // https://medium.com/angular-in-depth/angular-nested-reactive-forms-using-cvas-b394ba2e5d0d
  // https://stackblitz.com/edit/angular-simple-reactive-forms-cawhs7
  // https://sandroroth.com/blog/large-reactive-forms
  // https://indepth.dev/posts/1245/angular-nested-reactive-forms-using-controlvalueaccessors-cvas

  public nestedForm: FormGroup = new FormGroup({
    orderInfo: new FormControl(""),
    userTable: new FormControl("")
  });

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(){
    console.log("Customer Order Info", this.nestedForm.value);
  }

}