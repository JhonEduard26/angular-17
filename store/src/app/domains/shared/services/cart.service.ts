import { Injectable, computed, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Product[]>([]);
  total = computed(() => this.cart().reduce((acc, product) => acc + product.price, 0));

  constructor() { }

  addToCart(product: Product) {
    this.cart.update((products) => [...products, product]);
  }
}
