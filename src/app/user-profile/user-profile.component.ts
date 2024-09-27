import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  temp:any ;

  profileForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    emailId: new FormControl(null, [Validators.required , Validators.email]),
    filePath: new FormControl(null),
    imageFile: new FormControl(null)
  })

  constructor(private userService: UserService, private dataService: DataService) { }

  ngOnInit(): void {
    if(localStorage.getItem('id')){
      this.loadData();
    }
    else{
      setTimeout(() => {
        alert("Please Login First")
      }, 300);
    }
  }


  loadData() {    
    this.userService.getUserDetails(localStorage.getItem('id')).subscribe(
      (response:any) => {
        
          const userDetails = response
          this.temp = response.filePath;
          console.log(userDetails);

          this.profileForm.patchValue({
            name: response.name ,
            mobileNumber : response.phoneNumber, 
            address: response.address,
            emailId: response.email,
            filePath: "https://localhost:7185/" + response.filePath
          });
          
      },
      error => {
        // Handle any errors that occur during the API call
        console.error('Error fetching user details', error);
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

  selectedFile: File | null = null;

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
    const getid:any = localStorage.getItem('id')
    const formData = new FormData();
    formData.append('UserId', getid);
    formData.append('Name', this.profileForm.value.name);
    formData.append('Email', this.profileForm.value.emailId);
    formData.append('PhoneNumber', this.profileForm.value.mobileNumber);
    formData.append('Address', this.profileForm.value.address);
    formData.append('IsAdmin', 'false');

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
