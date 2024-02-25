import { Component, Input, Output, SimpleChanges, signal } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({ required: true }) items!: Product[];
  hideSideMenu = signal(true);
  total = signal(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.total.set(this.getTotal());
    }
  }

  toggleSideMenu() {
    this.hideSideMenu.update((prev) => !prev);
  }

  getTotal() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
