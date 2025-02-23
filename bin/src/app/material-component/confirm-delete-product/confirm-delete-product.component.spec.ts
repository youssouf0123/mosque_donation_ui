import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteProductComponent } from './confirm-delete-product.component';

describe('ConfirmDeleteProductComponent', () => {
  let component: ConfirmDeleteProductComponent;
  let fixture: ComponentFixture<ConfirmDeleteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
