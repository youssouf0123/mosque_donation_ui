import { Component } from '@angular/core';
import { ComponentService } from '../component.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(private componentService: ComponentService) {}

  showForm() {
    this.componentService.showForm();
  }
  
}