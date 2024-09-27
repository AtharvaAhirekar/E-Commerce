import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {

  constructor(private productServices:ProductService){}
  product:any;

  searchForm: FormGroup = new FormGroup({
    category: new FormControl(null, [Validators.required]),
    subcategory: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required])
  })

  searchData() {
    this.productServices.getProductByCateogry(this.searchForm.value.category, this.searchForm.value.subcategory, null).subscribe(
      (data: any) => {
        this.product = data.find((item:any)=>item.name == this.searchForm.value.name)
      },
      error => {
        alert(error)
        console.error(error);
      }
    )
  }

  deleteProduct() {
    this.productServices.deleteProduct(this.product.productId).subscribe(
      (response)=>{
        if(response && typeof response === 'object' && 'message' in response){
          alert(response.message)
        }
        else{
          alert('Product Deleted Successfully')
        }
      },
      (error)=>{
        alert(error)
        console.error(error);
        
      }
    )
  }

}
