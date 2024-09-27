import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url= "https://localhost:7185/api/product"

  constructor(private http : HttpClient) { }

  getAllProduct(){
    return this.http.get(this.url)
  }

  getProductByCateogry(category:string , subcategory:any , priceFilter:any){
    if(priceFilter > 0){
      return this.http.get(this.url+'/'+category+'/'+subcategory +'?price='+priceFilter)
    }
    else{
      return this.http.get(this.url+'/'+category+'/'+subcategory)
    }
  }

  getProductById(data:any){
    return this.http.get(this.url+'/'+data)
  }

  addProduct(data : any){
    return this.http.post(this.url , data);
  }

  updateProduct(data:any){
    return this.http.put(this.url , data);
  }

  deleteProduct(data:any){
    return this.http.delete(this.url+'/'+data)
  }

  bulkUpload(data : any){
    return this.http.post(this.url+'/bulk-upload',data)
  }

}
