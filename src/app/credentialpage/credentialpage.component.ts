import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-credentialpage',
  templateUrl: './credentialpage.component.html',
  styleUrls: ['./credentialpage.component.css']
})
export class CredentialpageComponent {

  constructor(private userService: UserService , private router:Router){}

  signInForm : FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required , Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required , Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10) ,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    address:new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6) , Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d).{8,}$')]),
    confirmPassword: new FormControl('', [Validators.required]),
    profilePhoto: new FormControl(null),
    terms: new FormControl(false, [Validators.requiredTrue])
  });

  onSubmit() {
    
    if (this.signInForm.valid) {
      const formData = new FormData();
      formData.append('Name' , this.signInForm.value.firstName+this.signInForm.value.lastName);
      formData.append('Password',this.signInForm.value.password);
      formData.append('Email',this.signInForm.value.email);
      formData.append('PhoneNumber', this.signInForm.value.phoneNumber);
      formData.append('Address',this.signInForm.value.address)
      const fileInput = document.querySelector('#profilePhoto') as HTMLInputElement;
      const file = fileInput?.files?.[0];
      if (file) {
        formData.append('ImageFile', file);
      }

      this.userService.registerUser(formData).subscribe(
        response=>{
          if(response && typeof response === 'object' && 'Message' in response){
            alert(response.Message)
          }
          else{
            alert("We got you Lets start together")
            this.router.navigateByUrl("/login")
          }
        },
        error=>{
          if(error.error && typeof error.error == 'object' && 'error' in error.error){
            alert(error.error.error)
          }
          else{
            alert("User Cannot be Added")
          }
        }
      )
    } 


    else {
      console.log('Form is not valid!');
    }
  }
}
