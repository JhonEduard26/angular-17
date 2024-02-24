import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) productImg = '';
  @Input({required: true}) title = '';
  @Input({required: true}) price = 0;

  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    this.addToCart.emit('Mensaje desde el hijo al padre' + this.title);
  }
}
