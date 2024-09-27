import { Component ,Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { WishlistService } from '../Services/wishlist.service';
import { OrderService } from '../Services/order.service';
import { LineitemService } from '../Services/lineitem.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  category: string = '';
  subcategory: string = '';
  products:any = [];
  priceFilter:number|null = null;
  favlist:any=[];
  favoriteProductIds: Set<string> = new Set<string>();
  getActiveOrder:any = null;

  

  constructor(private productservice : ProductService , 
              private route : ActivatedRoute,
              private router : Router,
              private wishListServices:WishlistService,
              private orderService : OrderService,
              private lineItemService : LineitemService){}


  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.category = param['category'];
      this.subcategory = param['subcategory']
      this.route.queryParams.subscribe(queryparam=>{
        this.priceFilter = queryparam['price'] ? Number(queryparam['price']) : null ;
        this.LoadData()
      })
    })

    // Get Active Order 
    this.orderService.getActiveOrderByUserId(localStorage.getItem('id')).subscribe(
      (data)=>{
        this.getActiveOrder = data;
        console.log(this.getActiveOrder);
        
        if(this.getActiveOrder == null){
          this.createNewOrder();
        }
      },
      // (error)=>{
      //   alert(error)
      //   console.log(error);
      // }
    )
  }

  createNewOrder(){
    const createOrder = {
      userId:localStorage.getItem('id'),
      data : new Date().toISOString().split('T')[0],
      statusId :  1006
    }
    this.orderService.createOrder(createOrder).subscribe(
      (data)=>{
        this.getActiveOrder = data;
      },
      (error)=>{
        alert(error);
      }
    )
  }

  LoadData(){
    this.productservice.getProductByCateogry(this.category,this.subcategory,this.priceFilter).subscribe(data=>{      
      this.products = data;
      console.log(this.products);
    })
    if(localStorage.getItem('id')){
      this.wishListServices.getWishListByUserId(localStorage.getItem('id')).subscribe(
        (data:any)=>{
          this.favlist = data;
          console.log(this.favlist);
          this.favoriteProductIds = new Set(data.map((item: any) => item.productId));
        }
      )
    }
  }

  onPriceFilterChange(priceLimit:number|null){
    this.router.navigate([],{
      relativeTo:this.route,
      queryParams :{price:priceLimit},
      queryParamsHandling: 'merge'
    }).then(()=>{
      this.LoadData()
    })

  }

  toggleFavorite(product: any) {   
    
    if(localStorage.getItem('id')){

      if (this.favoriteProductIds.has(product.productId)) {

        this.favoriteProductIds.delete(product.productId);
        
        var lineItemId ;
        this.favlist.forEach((element:any) => {
          if(element.productId == product.productId){
            lineItemId = element.id;
          }
        });
  
        this.wishListServices.deleteItemFromWishList(lineItemId).subscribe(
          (response)=>{
            if(response && typeof response === 'object' && 'message'in response){
              alert(response.message);
            }
            else{
              alert("Item removed from wishlist")
            }
          },
          (error)=>{
            alert(error)
          }
        )
  
  
      } else {
  
        // Add to favorite
        this.favoriteProductIds.add(product.productId);
  
        const addItem={
          userId:localStorage.getItem('id'),
          productId : product.productId
        }
  
        this.wishListServices.addItemToWishList(addItem).subscribe(
          (response)=>{
            if(response && typeof response === 'object' && 'message'in response){
              alert(response.message);
            }
            else{
              alert("Item removed from wishlist")
            }
          },
          (error)=>{
            alert(error)
          }
        )
      }
    }
    else{
      alert("Please Login First")
    }
  }

  addToCart(product:any){
    if(this.getActiveOrder){
      
      const lineItem = {
        quantity : 1,
        lineItemPrice : product.unitPrice,
        orderId : this.getActiveOrder.orderId,
        productId : product.productId
      }
      this.lineItemService.addLineItem(lineItem).subscribe(
        response =>{
          if(response && typeof response === 'object' && 'message' in response){
            alert(response.message + "Product added to cart")
          }
          else{
            alert("Product added to Cart")
          }
        },
        (error)=>{
          alert("Error Occured")
          console.error(error , error.message); 
        }
      )
    }
    else{
      alert("Please Login First")
    }
  }
}
