import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appProfileHost]' })
export class ComponentHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}
  
}