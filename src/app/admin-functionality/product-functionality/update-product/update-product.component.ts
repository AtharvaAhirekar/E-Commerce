import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  constructor(private productServices: ProductService) { }
  product :any ;
  selectedFile: File | null = null;
  temp : any ;

  searchForm: FormGroup = new FormGroup({
    category: new FormControl(null, [Validators.required]),
    subcategory: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required])
  })

  updateForm: FormGroup = new FormGroup({
    productId: new FormControl(null, Validators.required),
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]*')]),
    filePath: new FormControl(null),
    imageFile: new FormControl(null),
    description: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z0-9:,= ]*')]),
    unitPrice: new FormControl(null, [Validators.required, Validators.min(1)]),
    availableQuantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    category: new FormControl(null, [Validators.required]),
    subCategory: new FormControl(null, [Validators.required])
  })


  searchData() {
    this.productServices.getProductByCateogry(this.searchForm.value.category, this.searchForm.value.subcategory, null).subscribe(
      (data: any) => {
        this.product = data.find((item: any) => item.name === this.searchForm.value.name)
        console.log(this.product);
        if (this.product) {
          this.updateForm.patchValue(this.product);
          this.temp = this.product.filePath;
          
          this.updateForm.patchValue({
            filePath : "https://localhost:7185/" + this.product.filePath
          })
        }

      },
      error => {
        alert(error)
        console.error(error);
      }
    )
  }
  

  onUploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.updateForm.patchValue({
          filePath: e.target.result 
                   
        });
        console.log(this.updateForm.value.filePath);
        
      };
      reader.readAsDataURL(file);
    }
    this.updateForm.markAsDirty();
  }


  updateProduct() {

    const formData = new FormData();
    formData.append('ProductId',this.updateForm.value.productId);
    formData.append('Name' , this.updateForm.value.name);
    formData.append('Description',this.updateForm.value.description);
    formData.append('UnitPrice',this.updateForm.value.unitPrice);
    formData.append('AvailableQuantity' , this.updateForm.value.availableQuantity);
    formData.append('Category',this.updateForm.value.category)
    formData.append('SubCategory',this.updateForm.value.subCategory)


    if(this.selectedFile){
      formData.append('ImageFile',this.selectedFile)
    }
    else if(this.updateForm.value.filePath)
    {
      formData.append('FilePath', this.temp);
    }

    this.productServices.updateProduct(formData).subscribe(
      (response)=>{
        alert("Product Updated Successfully")
      },
      (error)=>{
        alert(error)
        console.error(error);
      }
    )

  }
}
