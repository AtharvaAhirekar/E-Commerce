import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  
  constructor(private userService : UserService){}

  gotUser=false;

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required])
  })

  profileForm: FormGroup = new FormGroup({
    userId:new FormControl(null),
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
        alert("User Not Found")
        
      }
    )
  }

  deleteUser() {
    this.userService.deleteUser(this.profileForm.value.userId).subscribe(
      (response)=>{
        if(response && typeof response === 'object' && 'message' in response){
          alert(response.message)
        }
        else{
          alert("User Deleted Successfully");
        }
      },
      (error)=>{
        alert(error);
        console.error(error);
      }      
    )
  }


}
