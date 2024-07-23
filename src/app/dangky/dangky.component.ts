import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import { Router, RouterModule } from '@angular/router';
import { Route } from '@angular/router';
@Component({
  selector: 'app-dangky',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,ReactiveFormsModule],
  templateUrl: './dangky.component.html',
  styleUrl: './dangky.component.css'
})
export class DangkyComponent {
  email : string ="";
  username : string = "";
  phone : string = "";
  address: string = "";
  password : string = "";
  repassword : string = "";
  signUpForm : FormGroup;
  constructor(private router:Router){
    this.signUpForm = new FormGroup({
      name : new FormControl("",[Validators.required]),
      email : new FormControl("",[Validators.required, Validators.email]),
      phone : new FormControl("",[Validators.required,Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/g)]),
      address : new FormControl("",[Validators.required]),
      password : new FormControl("",[Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,12}$')]),
      repassword: new FormControl("",Validators.required)
    }); 
        // Kiểm tra có  sự thay đổi nào trên form
        this.signUpForm.valueChanges.subscribe(() => {
          this.checkFormValidity();
        });
  }
  checkFormValidity() {
    if (this.signUpForm.valid && this.signUpForm.get('repassword')?.value === this.signUpForm.get('password')?.value) {
      document.getElementById('signupButton')?.removeAttribute('disabled');
    } else {
      document.getElementById('signupButton')?.setAttribute('disabled', 'true');
    }
  }
  async onSubmit() : Promise<void>{
    if(!this.email || !this.username || !this.phone || !this.password || !this.repassword || !this.address){
      return;
    }
    if(this.password !== this.repassword){
      return;
    }
    if(!this.signUpForm.valid){
      return;
    }
    // check trung username trong DB
    try {
      const checkEmail = await fetch("http://localhost:3000/users/?email="+this.email);
      const email = await checkEmail.json();
      const checkPhone = await fetch("http://localhost:3000/users/?phone="+this.phone);
      const phone = await checkPhone.json();
      if(email.length>0){
        alert("Email đã tồn tại");
        return;
      }
      if(phone.length>0){
        alert("Số điện thoại đã tồn tại");
        return;
      }
    } catch (error) {
      console.log(error);
      
    }
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    const user = {
      username : this.username,
      email : this.email,
      phone: this.phone,
      address: this.address,
      password : hashedPassword,
      image : 'default.png',
      role : "user"
    }
    console.log(user);
    const url = 'http://localhost:3000/users'; // Thay đổi URL theo cài đặt JSON Server
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
    try {
      const response = await fetch(url,options);
      const data = await response.json();
      console.log(data);
      this.router.navigate(['/dangnhap']);
    } catch (error) {
      console.log(error);
      
    }
  }
}
