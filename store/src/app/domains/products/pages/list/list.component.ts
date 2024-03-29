import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Category, Product } from '@shared/models/product.model';
import { ApiService } from '@shared/services/api.service';
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private cartService = inject(CartService);
  private apiService = inject(ApiService);
  private categoryService = inject(CategoryService);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  @Input() category_id?: string;

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category_id']) {
      this.getProducts()
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.apiService.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (err) => console.error(err)
    })
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (err) => console.error(err)
    })
  }
}
