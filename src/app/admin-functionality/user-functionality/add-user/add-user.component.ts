import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  
  constructor(private userService: UserService){}

  signInForm : FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    address:new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d).{8,}$')]),
    confirmPassword: new FormControl('', [Validators.required , Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d).{8,}$')]),
    profilePhoto: new FormControl(null),
    terms: new FormControl(false, [Validators.requiredTrue]),
    isAdmin:new FormControl(false),
  });

  onSubmit() {
    
    if (this.signInForm.valid) {
      const formData = new FormData();
      formData.append('Name' , this.signInForm.value.firstName+this.signInForm.value.lastName);
      formData.append('Password',this.signInForm.value.password);
      formData.append('Email',this.signInForm.value.email);
      formData.append('PhoneNumber', this.signInForm.value.phoneNumber);
      formData.append('Address',this.signInForm.value.address)
      formData.append('IsAdmin' , this.signInForm.value.isAdmin)
      
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
