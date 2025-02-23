import { Injectable,ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComponentService {

  private isLoggedIn = new BehaviorSubject(false);
  
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private cfr: ComponentFactoryResolver) {}

  showForm() {
    this.isLoggedIn.next(true);
  }

  showInfo() {
    this.isLoggedIn.next(false);
  }

  async loadComponent(vcr: ViewContainerRef, isLoggedIn: boolean) {
    
    const { InformationComponent } = await import('./information/information.component');

    const { FormComponent } = await import('./form/form.component');

    vcr.clear();

    let component : any = isLoggedIn ? FormComponent : InformationComponent;
   
    return vcr.createComponent(this.cfr.resolveComponentFactory(component))
    
}}