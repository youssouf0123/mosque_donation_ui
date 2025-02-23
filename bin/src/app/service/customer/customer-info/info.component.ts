import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ComponentHostDirective } from './component-host.directive';
import { ComponentService } from './component.service';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-container',
  template: `
    <ng-template appProfileHost></ng-template>
  `
})
export class InfoComponent implements OnInit, OnDestroy {

  @ViewChild(ComponentHostDirective, { static: true })
  profileHost: ComponentHostDirective;
  
  private destroySubject = new Subject();

  constructor(private componentService: ComponentService) {}

  ngOnInit() {

    const viewContainerRef = this.profileHost.viewContainerRef;

    this.componentService.isLoggedIn$
      .pipe(
        takeUntil(this.destroySubject),
        mergeMap(isLoggedIn =>
          this.componentService.loadComponent(viewContainerRef, isLoggedIn)
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
  
}