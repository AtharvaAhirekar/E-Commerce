import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../Services/wishlist.service';
import { OrderService } from '../Services/order.service';
import { LineitemService } from '../Services/lineitem.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  getActiveOrder:any = null;
  products:any = [
    // { id: 1, name: 'Product 1', description: 'Description of product 1', price: 20, quantity: 5, imageUrl: 'assets/tempch.jpg' },
    // { id: 2, name: 'Product 2', description: 'Description of product 2', price: 30, quantity: 3, imageUrl: 'assets/tempch.jpg' },
  ];

  constructor(private wishListServices : WishlistService , private orderService : OrderService , private lineItemService : LineitemService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.wishListServices.getWishListByUserId(localStorage.getItem('id')).subscribe(
      data=>{
        this.products = data;
        console.log(this.products);
        this.getActiveOrderById();
      }
    )
  }

  getActiveOrderById(){
    this.orderService.getActiveOrderByUserId(localStorage.getItem('id')).subscribe(
      (data)=>{
        this.getActiveOrder = data;
        console.log(this.getActiveOrder);
        
      },
      (error)=>{
        alert(error)
        console.log(error);
      }
    )
  }

  removeFromWishlist(productId: number): void {
    this.products = this.products.filter((product:any) => product.id !== productId);
    this.wishListServices.deleteItemFromWishList(productId).subscribe(
      (response)=>{
        if(response && typeof response === 'object' && 'message' in response){
          alert(response.message);
        }
        else{
          alert("Item Removed from wishlist")
        }
      },
      (error)=>{
        alert(error);
      }
    )

  }

  addToCart(item:any){
    if(this.getActiveOrder){

      console.log(this.getActiveOrder);
      
      console.log(item.product);
      
      
      const lineItem = {
        quantity : 1,
        lineItemPrice : item.product.unitPrice,
        orderId : this.getActiveOrder.orderId,
        productId : item.product.productId
      }

      console.log(lineItem);
      

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
          alert(error)
          console.log(error);
        }
      )
    }
  }
}
