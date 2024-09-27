import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { DataService } from '../Services/data.service';
import { Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  constructor(private userService : UserService , private router : Router , private data: DataService) {}

  userToken :any ;
  user:any;
  role:any;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl (null ,[Validators.required,Validators.minLength(3)]),
    password: new FormControl(null ,[Validators.required , Validators.minLength(6),Validators.maxLength(10),Validators.pattern('[a-zA-Z0-9@]*')]), 
    rememberMe: new FormControl(false),
    captchaToken:new FormControl(null, Validators.required)
  })
  onSubmit() {
    if (this.loginForm.valid) {

      
      const loginData = {
        name:this.loginForm.value.username,
        password:this.loginForm.value.password,
        captchaToken: this.loginForm.value.captchaToken  
      }

      this.userService.loginUser(loginData).subscribe({
        next:(response)=>{
          this.userToken = response.headers.get('jwt');
          this.userToken = JSON.parse(this.userToken);
          this.user = response.body;

          localStorage.setItem('token',this.userToken);
          localStorage.setItem('userDetails' ,  JSON.stringify(this.user));
          localStorage.setItem('id',this.user.userId)

          this.data.userName = this.user.name;
          this.data.userId = this.user.userId;
          this.data.filePath = this.user.filePath;
          this.data.email = this.user.email;
          this.data.phoneNumber = this.user.phoneNumber;
          this.data.address = this.user.address;
          this.role = this.user.role

          alert("Logged in Successfully")

          if(this.role == "Admin"){
            this.router.navigateByUrl('/admin')
          }
          else{
            this.router.navigateByUrl('');
          }
        },
        error:(errorResponse:HttpErrorResponse)=>{
          alert(errorResponse.message)
          console.log(errorResponse.message);
        }
      })
    }
  }
}
