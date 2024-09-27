import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url= "https://localhost:7185/api/order"
  constructor(private http : HttpClient) { }

  getActiveOrderByUserId(data : any){
    return this.http.get(this.url+'/user/activeOrder/'+data);
  }

  createOrder(data:any){
    return this.http.post(this.url,data);
  }

  updateOrder(data:any){
    return this.http.put(this.url,data);
  }

  getOrdersByUserId(data:any){
    return this.http.get(this.url + '/user/'+data)
  }

}
