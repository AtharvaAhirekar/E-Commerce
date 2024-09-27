import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  constructor(private userService : UserService){}

  gotUser = false
  temp:any ;
  selectedFile: File | null = null;


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
    imageFile: new FormControl(null),
    isAdmin:new FormControl(null)
  })

  searchData() {
    this.userService.getUserByUserName(this.searchForm.value.name).subscribe(
      (data:any)=>{
        console.log(data);
        
        this.profileForm.patchValue(data);
        this.profileForm.patchValue({
          filePath : "https://localhost:7185/"+data.filePath
        })
        this.temp = data.filePath

        this.gotUser = true;
      },
      error=>{
        console.log(error);
        
      }
    )
  }
  onRemoveImage() {
    this.profileForm.patchValue({
      filePath: null,
      imageFile:null
    });
    this.profileForm.markAsDirty();
  }
  onUploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileForm.patchValue({
          filePath: e.target.result          
        });
      };
      reader.readAsDataURL(file);
    }
    this.profileForm.markAsDirty();
  }

  submitData() {
    const formData = new FormData();
    formData.append('UserId', this.profileForm.value.userId);
    formData.append('Name', this.profileForm.value.name);
    formData.append('Email', this.profileForm.value.email);
    formData.append('PhoneNumber', this.profileForm.value.phoneNumber);
    formData.append('Address', this.profileForm.value.address);
    formData.append('IsAdmin', this.profileForm.value.isAdmin);

    if (this.selectedFile) {

      formData.append('ImageFile', this.selectedFile);

    } 
    else if (this.profileForm.value.filePath) 
    {
      formData.append('FilePath', this.temp);
    }
    
    this.userService.updateUser(formData).subscribe(
      response=>{
        alert("User Updated Successfully");
      },
      error=>{
        alert(error);
      }
    )

  }
  
}
