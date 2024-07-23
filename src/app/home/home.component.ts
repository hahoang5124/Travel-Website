import { Component, inject,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CategoryInterface } from '../category-interface';
import { CategoryService } from '../category.service';
import { RouterModule } from '@angular/router';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,SlickCarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
products : ProductInterface[] = [];
productGhim : ProductInterface[] = [];
category : CategoryInterface[] = [];
prductService: ProductService =inject(ProductService);
cateService : CategoryService = inject(CategoryService);
constructor(){
  this.prductService.getListProducts('http://localhost:3000/products').then((data:ProductInterface[])=>{
    this.products = data;
    console.log(this.products);
  }
  );
  this.prductService.getListProducts('http://localhost:3000/products?ghim=1').then((data:ProductInterface[])=>{
    this.productGhim = data;
    console.log(this.productGhim);
  });
    this.cateService.getListCategory('http://localhost:3000/category').then((data:CategoryInterface[])=>{
    this.category = data;
    console.log(this.category);
  }
  );

}
MultiSlideConfig={
  slidesToShow :4,
  autoplay: false,
  autoplaySpeed: 1000,
  draggable: true,

  prevArrow:"<button type='button' class='z-1 py-2 rounded-circle  btn bg-dark-subtle position-absolute start-0 top-50 translate-middle-y opacity-50'><i class='fa-solid fa-chevron-left fa-xl'></i></button>",
  nextArrow:"<button type='button' class='btn py-2 rounded-circle bg-dark-subtle position-absolute end-0 top-50 translate-middle-y opacity-50'><i class='fa-solid fa-chevron-right fa-xl'></i></button>",
  responsive: [
      {
          breakpoint: 1200,
          settings: {
          slidesToShow: 3,
          }
      },
      {
          breakpoint: 1000,
          settings: {
          slidesToShow: 2,
          }
      },
      {
          breakpoint: 500,
          settings: {
          slidesToShow: 1,
          }
      }
  ]

}
ngOnInit(): void {
  
}
}
