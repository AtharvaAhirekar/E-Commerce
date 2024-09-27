import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './admin-functionality/admin-layout/admin-layout.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { UserMenComponent } from './user-men/user-men.component';
import { UserWomenComponent } from './user-women/user-women.component';
import { UserKidsComponent } from './user-kids/user-kids.component';
import { HomeandfurnitureComponent } from './homeandfurniture/homeandfurniture.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CredentialpageComponent } from './credentialpage/credentialpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { AdminHomePageComponent } from './admin-functionality/admin-home-page/admin-home-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {
    path:'',
    component:UserlayoutComponent,
    children:[
      {
        path:'',
        component:UserHomePageComponent
      },
      {
        path:'men',
        component:UserMenComponent
      },
      {
        path:'women',
        component:UserWomenComponent
      },
      {
        path:'kids',
        component:UserKidsComponent
      },
      {
        path:'furniture',
        component:HomeandfurnitureComponent
      },
      {
        path:'electronics',
        component:ElectronicsComponent
      },
      {
        path:'profile',
        component:UserProfileComponent
      },
      {
        path:'signup',
        component:CredentialpageComponent
      },
      {
        path:'login',
        component:LoginpageComponent
      },
      {
        path:'wishlist',
        component:WishlistComponent
      },
      {
        path:'cart',
        component:CartpageComponent
      },
      {
        path:'orders',
        component:OrderhistoryComponent
      },

      {
        path:'product/:category/:subcategory',
        component:ProductPageComponent
      }, 
      {
        path:'forgot-password',
        component:ForgotPasswordComponent
      },
      {
        path:'reset-password',
        component:ResetPasswordComponent
      }     
    ]
  },
  {
    path:'admin',
    component:AdminLayoutComponent,
    children:[
      {
        path:'',
        component:AdminHomePageComponent
      },
      {
        path:'product',
        loadChildren:()=> import('./admin-functionality/product-functionality/product-functionality.module').then(m=>m.ProductFunctionalityModule)
      },
      {
        path:'user',
        loadChildren:()=>import('./admin-functionality/user-functionality/user-functionality.module').then(m=>m.UserFunctionalityModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
