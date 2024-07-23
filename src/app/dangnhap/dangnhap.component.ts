import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-dangnhap',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './dangnhap.component.html',
  styleUrl: './dangnhap.component.css'
})
export class DangnhapComponent {
  email : string ="";
  password : string = "";
  signInForm : FormGroup;
  userService : UserService = inject(UserService);
  constructor(private router:Router){
    this.signInForm = new FormGroup({
      email : new FormControl("",[Validators.required, Validators.email]),
      password : new FormControl("",[Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,12}$')]),
    }); 
    // Kiểm tra có  sự thay đổi nào trên form
    this.signInForm.valueChanges.subscribe(() => {
      this.checkFormValidity();
    });
  }
  checkFormValidity() {
    if (this.signInForm.valid) {
      document.getElementById('signInButton')?.removeAttribute('disabled');
    } else {
      document.getElementById('signInButton')?.setAttribute('disabled', 'true');
    }
  }
  async onSubmit(): Promise<void>{
    if( !this.email || !this.password){
    return;
    }    
    if(!this.signInForm.valid){
      return;
    }
    try {
      const reponse = await fetch("http://localhost:3000/users/?email="+this.email);
      const data = await reponse.json();
      if(data.length == 0){
        alert("Tài khoản không tồn tại");
        return;
      }
      if(!bcrypt.compareSync(this.password,data[0].password)){
        console.log(typeof(this.password));
        console.log(typeof(data[0].password));
        alert("Mật khẩu không chính xác");
        return;
      }else{
        alert("đăng nhạp thành công");
        this.userService.setUser(data[0]);
        this.router.navigate(['/']);

      }

    } catch (error) {
      console.log(error);
      
    }
  }
}