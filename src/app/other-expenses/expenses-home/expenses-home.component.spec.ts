import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ExpensesHomeComponent } from './expenses-home.component';

describe('ExpensesHomeComponent', () => {

  let component: ExpensesHomeComponent;
  let fixture: ComponentFixture<ExpensesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesHomeComponent ],
      imports: [
        ReactiveFormsModule
      ],      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

});