import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  ngOnInit(): void {
    this.loadData()
  }

  isLoggedin:any ;
  user: any  ;
  username:any ; 

  loadData() {
    this.isLoggedin =localStorage.getItem('id') || null;
    this.user = localStorage.getItem('userDetails') || null;
    this.username = this.user ? JSON.parse(this.user).name : "User";
  }


  logout() {
    localStorage.clear();
    alert("Logged out Successfully")
  }
}
