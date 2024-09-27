import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  url="https://localhost:7185/api/favouriteItem"

  constructor(private http : HttpClient) { }

  getWishListByUserId(data:any){
    return this.http.get(this.url+'/user/'+data);
  }

  deleteItemFromWishList(data:any){
    return this.http.delete(this.url +'/'+data)
  }

  addItemToWishList(data:any){
    
    return this.http.post(this.url,data);
  }

}
