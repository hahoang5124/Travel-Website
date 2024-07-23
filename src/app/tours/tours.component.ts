import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, RouterModule,SlickCarouselModule, FormsModule,NgxPaginationModule,HttpClientModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent implements OnInit {
  products : ProductInterface[] = [];
  randomProducts: ProductInterface[] = [];
  prductService: ProductService =inject(ProductService);
  selectedSort: string = 'asc';
  psize=6;
  currentPage=1;

  constructor(){
    this.prductService.getListProducts('http://localhost:3000/products').then((data:ProductInterface[])=>{
      this.products = data;
      console.log(this.products);
    }
    );
    this.prductService.getListProducts('http://localhost:3000/products').then((data:ProductInterface[])=>{
      this.randomProducts = data;
      this.randomProducts = this.randomProducts.sort(() => 0.5 - Math.random());
      console.log(this.randomProducts);
    }
    );
  }
  onSortChange(): void {
    console.log(this.selectedSort);
    
    if (this.selectedSort === 'asc') {
      this.products.sort((a, b) => a.price - b.price); // Sắp xếp tăng dần
    } else {
      this.products.sort((a, b) => b.price - a.price); // Sắp xếp giảm dần
    }
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
