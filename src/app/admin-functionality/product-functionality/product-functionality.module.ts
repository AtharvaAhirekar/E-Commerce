import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';


const routes : Routes = [
  {
    path:'addproduct',
    component:AddProductComponent
  },
  {
    path:'viewproducts',
    component:ViewproductsComponent
  },
  {
    path:'updateproduct',
    component:UpdateProductComponent
  },
  {
    path:'deleteproduct',
    component:DeleteProductComponent
  }
]

@NgModule({
  declarations: [
    AddProductComponent,
    ViewproductsComponent,
    UpdateProductComponent,
    DeleteProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductFunctionalityModule { }
