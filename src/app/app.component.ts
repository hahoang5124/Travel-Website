import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebDuLich';
  showForm: boolean = false;
  productService: ProductService =inject(ProductService);
  userService : UserService = inject(UserService);
  user = this.userService.getUser();
  log(){

    
  }
  constructor(private router: Router){}
  toggleForm() {
    this.showForm = !this.showForm;
  }
    //Chức năng tìm kiếm
    onSearch(inputsearch: string) {
      this.productService.setKeyword(inputsearch);
      console.log(inputsearch);
      if(this.router.url === '/timkiem'){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/timkiem']);
        }else{  
          this.router.navigate(['/timkiem']);
        }
    }
}
