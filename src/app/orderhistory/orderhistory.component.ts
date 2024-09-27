import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/order.service';
import { LineitemService } from '../Services/lineitem.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {
  orders: any= []; 

  constructor(private orderService: OrderService, private lineItemService: LineitemService) { }

  ngOnInit(): void {
    this.orderService.getOrdersByUserId(localStorage.getItem('id')).subscribe(
      data => {
        this.orders = data;
        console.log(this.orders);

        this.orders.forEach((order: any) => {
          this.lineItemService.getLineItemsByOrderId(order.orderId).subscribe(
            lineItems => {
              order.lineitems = lineItems; // Assign line items to the specific order object
            },
            error => {
              console.error(`Error fetching line items for order ID ${order.orderId}`, error);
            }
          );
        });
      },
      error => {
        console.error("Error Occurred ", error);
      }
    );
  }
}
