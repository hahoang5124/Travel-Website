import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import { Router, RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-doimatkhau',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,ReactiveFormsModule],
  templateUrl: './doimatkhau.component.html',
  styleUrl: './doimatkhau.component.css'
})
export class DoimatkhauComponent {
  userService : UserService = inject(UserService);
  user = this.userService.getUser();
  password : string = "";
  repassword : string = "";
  rePassWordForm : FormGroup;
  constructor(private router:Router){
    this.rePassWordForm = new FormGroup({
      password : new FormControl("",[Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,12}$')]),
      repassword: new FormControl("",Validators.required)
    }); 
        // Kiểm tra có  sự thay đổi nào trên form
        this.rePassWordForm.valueChanges.subscribe(() => {
          this.checkFormValidity();
        });
  }
  checkFormValidity() {
    if (this.rePassWordForm.valid && this.rePassWordForm.get('repassword')?.value === this.rePassWordForm.get('password')?.value) {
      document.getElementById('signupButton')?.removeAttribute('disabled');
    } else {
      document.getElementById('signupButton')?.setAttribute('disabled', 'true');
    }
    console.log(this.user.id);
    
  }
  async onSubmit() : Promise<void>{
    if(!this.password || !this.repassword){
      return;
    }
    if(this.password !== this.repassword){
      return;
    }
    if(!this.rePassWordForm.valid){
      return;
    }
    // check trung username trong DB
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    const user = {
      id : this.user.id,
      name: this.user.username,
      password : hashedPassword,
      email : this.user.email,
      phone : this.user.phone,
      image : this.user.image,
      role : this.user.role,
    }
    console.log(user);
    const url = 'http://localhost:3000/users/'+this.user.id; // Thay đổi URL theo cài đặt JSON Server
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
    try {
      const response = await fetch(url,options);
      const data = await response.json();
      console.log(data);
      this.router.navigate(['/userInfo']);
    } catch (error) {
      console.log(error);
      
    }
  }
}
