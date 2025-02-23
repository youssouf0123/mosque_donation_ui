import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCartCheckoutComponent } from './custom-cart-checkout.component';

describe('CustomCartCheckoutComponent', () => {
  let component: CustomCartCheckoutComponent;
  let fixture: ComponentFixture<CustomCartCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCartCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCartCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
