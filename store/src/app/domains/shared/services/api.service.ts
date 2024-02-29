import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://fakestoreapi.com'
  private http = inject(HttpClient);

  getProducts(category_id?: string) {
    if (category_id) {
      return this.http.get<Product[]>(`${this.baseUrl}/products/category/${category_id}`)
    }
    return this.http.get<Product[]>(`${this.baseUrl}/products`)
  }

  getSingleProduct(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`)
  }
}
