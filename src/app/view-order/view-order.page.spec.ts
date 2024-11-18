import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewOrderPage } from './view-order.page';

describe('ViewOrderPage', () => {
  let component: ViewOrderPage;
  let fixture: ComponentFixture<ViewOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
