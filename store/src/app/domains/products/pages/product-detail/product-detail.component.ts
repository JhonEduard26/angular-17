import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ApiService } from '@shared/services/api.service';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input() id?: string;
  private apiService = inject(ApiService);
  private cartService = inject(CartService);
  private productId!: string;
  product = signal<Product | null>(null)

  ngOnInit() {
    this.productId = this.id?.split('-')[0] || '';
    if (this.productId) {
      this.apiService.getSingleProduct(this.productId).subscribe({
        next: (product) => {
          this.product.set(product);
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

  addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
