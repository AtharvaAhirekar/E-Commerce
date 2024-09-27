import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {


  constructor(private productService: ProductService) { }

  excelFile: File | null = null

  productForm: FormGroup = new FormGroup({
    productImage: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]*')]),
    description: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z0-9:,= ]*')]),
    unitPrice: new FormControl(null, [Validators.required, Validators.min(1)]),
    quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    category: new FormControl(null, [Validators.required]),
    subcategory: new FormControl(null, [Validators.required])
  });



  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('Name', this.productForm.value.name);
      formData.append('Description', this.productForm.value.description);
      formData.append('UnitPrice', this.productForm.value.unitPrice);
      formData.append('AvailableQuantity', this.productForm.value.quantity);
      formData.append('Category', this.productForm.value.category);
      formData.append('SubCategory', this.productForm.value.subcategory)
      const fileInput = document.querySelector('#productImage') as HTMLInputElement;
      const file = fileInput?.files?.[0];
      if (file) {
        formData.append('ImageFile', file);
      }

      this.productService.addProduct(formData).subscribe(
        (response) => {
          if (response && typeof response === 'object' && 'message' in response) {
            alert(response.message);
          }
          else {
            alert("Product Added Successfully")
          }
        },
        (error) => {
          if (error) {
            console.error(error);
            alert(error);
          }
        }
      )

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  onFileChange(event: any) {
    this.excelFile = event.target.files[0];
  }

  onUpload() {
    if(this.excelFile){
      const formData1 = new FormData();
      formData1.append('file',this.excelFile)
      
      this.productService.bulkUpload(formData1).subscribe({
        next:(response)=>{
          if(response && typeof response === 'object' && 'message' in response){
            alert(response.message)
          }
          else{
            alert("Products Successfully Uploaded")
          }
        },
        error: (error) => console.error('Upload failed', error),
      })
    }
  }
}
