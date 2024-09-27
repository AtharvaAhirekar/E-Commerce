import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OrderService } from '../Services/order.service';
import { LineitemService } from '../Services/lineitem.service';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent implements OnInit {


  currentStep = 1;


  goToStep(step: number): void {
    if (step <= this.currentStep) {
      this.currentStep = step;
    }
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  constructor(private orderService: OrderService, private lineItemService: LineitemService) { }

  lineItems: any = [];
  order: any;
  totalprice: any;
  user: any ;
  address :any ;



  ngOnInit(): void {
    if(localStorage.getItem('id')){
      this.user = localStorage.getItem('userDetails') ;
      this.address = JSON.parse(this.user).address;
      this.loadData();
    }
    else{
      setTimeout(() => {
        alert("Please Login First")
      }, 300);
    }  
    
  }

  loadData() {
    // Load any Active Order
    this.orderService.getActiveOrderByUserId(localStorage.getItem('id')).subscribe(
      data => {
        this.order = data
        console.log(this.order);

        // Get LineItems having same Order Id
        this.lineItemService.getLineItemsByOrderId(this.order.orderId).subscribe(
          data => {
            // Store the LineItems
            this.lineItems = data;
            console.log(data);
            this.updateOrderPrice()
          },
          error => {
            console.error('Error fetching line items:', error);
          }
        )
      },
      error => {
        console.error('Error fetching order:', error);
      }
    )
  }


  onQuantityChange(item: any): void {
    console.log("Updated Quantity for item ID = " + item.id + " : " + item.quantity);
    item.lineItemPrice = item.quantity * item.product.unitPrice;

    console.log(item);

    this.updateLineItem(item);

  }

  changeQuantity(item: any, change: number): void {
    const newQuantity = (item.quantity || 0) + change;
    if (newQuantity >= 1) { // Ensure the quantity is at least 1
      item.quantity = newQuantity;
      this.onQuantityChange(item); // Call to log the updated quantity
    }
  }

  updateLineItem(item: any) {
    this.lineItemService.updateLineItem(item).subscribe(
      (response) => {
        if (response && typeof response === 'object' && 'message' in response) {
          alert(response.message);

        }
        else {
          alert("Quantity of " + item.product.name + " changes to " + item.quantity)
        }
        this.updateOrderPrice();
      },
      (error) => {
        console.error('Error updating line item:', error);
        alert('An error occurred while updating the item.');
      }
    )
  }

  removeLineItem(item: any) {
    console.log(item.id);

    this.lineItemService.deleteLineItem(item.id).subscribe(

      (resonse) => {
        if (resonse && typeof resonse === 'object' && 'message' in resonse) {
          alert(resonse.message)

        }
        else {
          alert("LineItem Deleted Successfully")
        }
        this.lineItems = this.lineItems.filter((getitem: any) => getitem.id != item.id);
        this.updateOrderPrice()
      },
      (error) => {
        console.error("Error Ocurred ", error);
      }
    )
  }

  updateOrderPrice() {
    this.order.totalPrice = 0;
    this.lineItems.forEach((element: any) => {
      this.order.totalPrice += element.lineItemPrice;
    });
    this.totalprice = this.order.totalPrice
    console.log('Updated Total Price:', this.totalprice);
  }



  updateOrder() {
    this.orderService.updateOrder(this.order).subscribe(
      (respose) => {
        alert("Order Confirmed");
        this.nextStep();
      },
      (error) => {
        console.error("Error Occured while creating order : ", error)
      }
    )
  }

  updateOrderStatus() {
    this.order.statusId = 1003;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`; // e.g., "2024-09-04"
    this.order.date = formattedDate
    this.updateOrder();
  }
}
