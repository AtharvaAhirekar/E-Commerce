import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';


@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent {

  constructor(private productServices : ProductService){}

  searchForm :  FormGroup = new FormGroup({
    category: new FormControl(null, [Validators.required]),
    subcategory: new FormControl(null, [Validators.required])
  })

  products:any=[]


  searchData() {
    this.productServices.getProductByCateogry(this.searchForm.value.category , this.searchForm.value.subcategory,null).subscribe(
      data=>{
        this.products = data
      },
      error=>{
        alert(error)
        console.error(error);
      }
    )
  }

  
}
