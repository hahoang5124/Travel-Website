import { Component} from '@angular/core';
import { ProductService } from '../product.service';
import { ProductInterface } from '../product-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductdetailComponent {
  productdetail?: ProductInterface;
  quantityInput : number = 1;
  constructor( private productService: ProductService, private route: ActivatedRoute) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productService.getProductDetail('http://localhost:3000/products/'+id).then((data:ProductInterface)=>{
      this.productdetail = data;
      console.log(this.productdetail);
    } );  
  }
  addCart(quantity: string): void {
    if (this.productdetail) {
      this.productService.addCart(this.productdetail, parseInt(quantity, 10));
      console.log(this.productService.getCartLength());
    }
  }
  decrease(){
    this.quantityInput -=1;
  }
  increase(){
    this.quantityInput +=1;
  }
}
