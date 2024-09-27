import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { RouterModule } from '@angular/router';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { ProductFunctionalityModule } from './product-functionality/product-functionality.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminNavbarComponent,
    AdminHomePageComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductFunctionalityModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminFunctionalityModule { }
