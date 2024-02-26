import { Component, inject, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  private cartService = inject(CartService);
  items = this.cartService.cart;
  total = this.cartService.total;

  toggleSideMenu() {
    this.hideSideMenu.update((prev) => !prev);
  }
}
