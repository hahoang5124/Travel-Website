import { Injectable } from '@angular/core';
import { ProductInterface } from './product-interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private keyword: string = '';
  private cart: any = [];
  setKeyword(keyword: string) {
    this.keyword = keyword;
  }
  getKeyword() {
    return this.keyword;
  }
  async getListProducts(url:string): Promise<ProductInterface[]> {
    const data = await fetch(url);
    return await data.json() ?? [];
  }
  async getProductDetail(url:string): Promise<ProductInterface> {
    const data = await fetch(url);
    return await data.json() ?? {};
  }
  addCart(product: ProductInterface, quantity: number) {
    const index = this.cart.findIndex((item: ProductInterface) => item.id === product.id);
    if (index === -1) {
      this.cart.push({ ...product, quantity });
    } else {
      this.cart[index].quantity += quantity;
    }
  }
  getCart() {
    return this.cart;
  }
  getCartLength() {
    let length = 0;
    for (let p of this.cart) {
      length += p.quantity;
    }
    return length;
  }
  getSumMoney(): number {
    let total = 0;
    for (let p of this.cart) {
      total += p.price * p.quantity;
    }
    return total;
  }
  deleteCart(id: string) {
    this.cart = this.cart.filter((item: ProductInterface) => item.id !== id);
  }
  constructor() { }
}
