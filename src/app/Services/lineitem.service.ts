import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LineitemService {

  url= "https://localhost:7185/api/lineitem"
  constructor(private http : HttpClient) { }

  getLineItemsByOrderId(data:any){
    return this.http.get(this.url+'/orderId/'+data);
  }

  addLineItem(data:any){
    return this.http.post(this.url , data)
  }

  updateLineItem(data:any){
    return this.http.put(this.url , data);
  }

  deleteLineItem(data:any){
    return this.http.delete(this.url+'/'+data);
  }
  
}
