import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerHomePagePage } from './customer-home-page.page';

describe('CustomerHomePagePage', () => {
  let component: CustomerHomePagePage;
  let fixture: ComponentFixture<CustomerHomePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerHomePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
