import { Injectable } from '@angular/core';
import { CategoryInterface } from './category-interface';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  async getListCategory(url:string): Promise<CategoryInterface[]> {
    const data = await fetch(url);
    return await data.json() ?? [];
  }
  constructor() { }
}
