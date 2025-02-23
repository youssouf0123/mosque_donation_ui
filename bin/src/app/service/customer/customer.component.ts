import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ComponentService } from './customer-info/component.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  // https://angular.io/guide/dynamic-component-loader
  // https://medium.com/angular-in-depth/loading-components-dynamically-in-angular-cd13b9fdb715
  // https://github.com/ShilpaLalwani/dynamic-component

  panelOpenState = false;

  myControl = new FormControl();
  options: string[] = ['Bruce Wayne', 'Clark Kent', 'John Wick', 'Balla Moussa Keita'];
  filteredOptions: Observable<string[]>;

  // constructor() { }
  constructor(private componentService: ComponentService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {

    this.panelOpenState = true;
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));

  }

  showForm() {
    this.componentService.showForm();
  }

  processOption(selected) {
    console.log(selected);
    this.componentService.showInfo();
  }

  handleSpacebar(event) {
    if (event.keyCode === 32) {
      event.stopPropagation();
    }
  }
  
}