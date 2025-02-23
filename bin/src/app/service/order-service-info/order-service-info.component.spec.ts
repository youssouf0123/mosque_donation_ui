import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServiceInfoComponent } from './order-service-info.component';

describe('OrderServiceInfoComponent', () => {
  let component: OrderServiceInfoComponent;
  let fixture: ComponentFixture<OrderServiceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderServiceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderServiceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
