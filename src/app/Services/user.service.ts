import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "https://localhost:7185/api/User";
  constructor(private http : HttpClient) { }


  loginUser(data:any){
    return this.http.post(this.url + "/login" , data , {observe:'response'})
  }

  registerUser(data:any){
    return this.http.post(this.url , data);
  }

  getUserDetails(data:any){
    console.log(data);
    return this.http.get(this.url+'/'+data);
  }

  updateUser(data:any){
    return this.http.put(this.url , data)
  }

  getUserByUserName(data:any){
    return this.http.get(this.url+'/'+data)
  }

  deleteUser(data:any){
    return this.http.delete(this.url+'/'+data)
  }

  forgotPassword(email: string): Observable<any> {
    console.log(email);
    
    return this.http.post(this.url+'/forgot-password' ,{email});
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(this.url+'/reset-password',{token, newPassword});
  }


}
