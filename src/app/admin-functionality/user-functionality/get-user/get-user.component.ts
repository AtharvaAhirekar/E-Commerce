import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent {

  constructor(private userService : UserService){}

  gotUser=false;

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required , Validators.minLength(3)])
  })

  profileForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    filePath: new FormControl(null),
    imageFile: new FormControl(null)
  })


  searchData() {
    this.userService.getUserByUserName(this.searchForm.value.name).subscribe(
      (data:any)=>{
        console.log(data);
        
        this.profileForm.patchValue(data);
        this.profileForm.patchValue({
          filePath : "https://localhost:7185/"+data.filePath
        })

        this.gotUser = true;
      },
      error=>{
        console.log(error);
        alert("User Not Found")
      }
    )
  }

  

}
