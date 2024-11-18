import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminHomePagePage } from './admin-home-page.page';

describe('AdminHomePagePage', () => {
  let component: AdminHomePagePage;
  let fixture: ComponentFixture<AdminHomePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
