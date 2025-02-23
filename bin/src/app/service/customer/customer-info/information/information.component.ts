import { Component } from '@angular/core';
import { ComponentService } from '../component.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {

  constructor(private componentService: ComponentService) {}

  login() {
    this.componentService.showInfo();
  }
  
}