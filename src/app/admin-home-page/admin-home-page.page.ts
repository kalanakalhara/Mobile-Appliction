import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.page.html',
  styleUrls: ['./admin-home-page.page.scss'],
})
export class AdminHomePagePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToAddProduct() {
    this.router.navigate(['/add-product']); // Adjust the route to your registration page
  }

  navigateToViewProduct() {
    this.router.navigate(['/view-product']); // Adjust the route to your registration page
  }

  navigateToViewOrder() {
    this.router.navigate(['/view-order']); // Adjust the route to your registration page
  }
}
