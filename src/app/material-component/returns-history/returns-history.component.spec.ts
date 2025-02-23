import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsHistoryComponent } from './returns-history.component';

describe('ReturnsHistoryComponent', () => {
  let component: ReturnsHistoryComponent;
  let fixture: ComponentFixture<ReturnsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
