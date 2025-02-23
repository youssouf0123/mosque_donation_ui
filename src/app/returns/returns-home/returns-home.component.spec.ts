import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsHomeComponent } from './returns-home.component';

describe('ReturnsHomeComponent', () => {
  let component: ReturnsHomeComponent;
  let fixture: ComponentFixture<ReturnsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
