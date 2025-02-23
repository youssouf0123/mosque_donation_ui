import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCartViewComponent } from './custom-cart-view.component';

describe('CustomCartViewComponent', () => {
  let component: CustomCartViewComponent;
  let fixture: ComponentFixture<CustomCartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCartViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
