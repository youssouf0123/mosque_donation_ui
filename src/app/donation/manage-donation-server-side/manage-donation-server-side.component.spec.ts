import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDonationServerSideComponent } from './manage-donation-server-side.component';

describe('ManageDonationServerSideComponent', () => {
  let component: ManageDonationServerSideComponent;
  let fixture: ComponentFixture<ManageDonationServerSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDonationServerSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDonationServerSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
