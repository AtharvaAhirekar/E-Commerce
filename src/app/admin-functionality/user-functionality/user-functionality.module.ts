import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { UpdateUserComponent } from './update-user/update-user.component';
import { GetUserComponent } from './get-user/get-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

const routes : Routes =[
  {
    path:'adduser',
    component:AddUserComponent
  },
  {
    path:'getuser',
    component:GetUserComponent
  },
  {
    path:'deleteuser',
    component:DeleteUserComponent
  },
  {
    path:'updateuser',
    component : UpdateUserComponent
  }

]


@NgModule({
  declarations: [
    AddUserComponent,
    UpdateUserComponent,
    GetUserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserFunctionalityModule { }
