import { Component,inject } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-thongtinnguoidung',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './thongtinnguoidung.component.html',
  styleUrl: './thongtinnguoidung.component.css'
})
export class ThongtinnguoidungComponent {
  userService : UserService = inject(UserService);
  user = this.userService.getUser();
  constructor(private router:Router){}
  logOut(){
    this.userService.logOut();
    this.router.navigate(['/']);

  }
}
