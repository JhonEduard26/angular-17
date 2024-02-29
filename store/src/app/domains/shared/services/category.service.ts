import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'https://fakestoreapi.com'
  private http = inject(HttpClient)

  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/products/categories`)
  }

  constructor() { }
}
