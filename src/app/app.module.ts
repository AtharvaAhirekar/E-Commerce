import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AdminFunctionalityModule } from './admin-functionality/admin-functionality.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserMenComponent } from './user-men/user-men.component';
import { UserWomenComponent } from './user-women/user-women.component';
import { UserKidsComponent } from './user-kids/user-kids.component';
import { HomeandfurnitureComponent } from './homeandfurniture/homeandfurniture.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { OnInit } from '@angular/core';
import { NgxCaptchaModule } from 'ngx-captcha'; 
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CredentialpageComponent } from './credentialpage/credentialpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { JwtInterceptor } from './jwt.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    UserNavbarComponent,
    UserlayoutComponent,
    UserHomePageComponent,
    UserFooterComponent,
    UserMenComponent,
    UserWomenComponent,
    UserKidsComponent,
    HomeandfurnitureComponent,
    ElectronicsComponent,
    ProductPageComponent,
    UserProfileComponent,
    CredentialpageComponent,
    LoginpageComponent,
    WishlistComponent,
    CartpageComponent,
    OrderhistoryComponent,
    PaginationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminFunctionalityModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
