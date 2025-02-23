import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsFormComponent } from './returns-form.component';

describe('ReturnsFormComponent', () => {
  let component: ReturnsFormComponent;
  let fixture: ComponentFixture<ReturnsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
