import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderItem } from '../../interfaces/order-item';
import { OrderItemService } from '../../services/order-item.service';
import { Observable } from 'rxjs';
import { MenuItemService } from '../../services/menu-item.service';
import { MenuItem } from '../../interfaces/menu-item';
import { MatSnackBar } from '@angular/material/snack-bar';import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditOrderDialogComponent } from '../../dialog/edit-order-dialog/edit-order-dialog.component';
import { EditOrderItemDialogComponent } from '../../dialog/edit-order-item-dialog/edit-order-item-dialog.component';
;

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.scss'
})
export class ViewOrdersComponent implements OnInit {
  allOrders: Order[] = [];
  orderItemsMap: Map<string, Observable<OrderItem[]>> = new Map<string, Observable<OrderItem[]>>();
  menuItemMap: Map<string, string> = new Map<string, string>();
  menuItems: MenuItem[] = [];

  constructor(
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private menuItemService: MenuItemService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadMenuItems();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      this.allOrders = orders;
      this.loadOrderItemsForAllOrders();
    });
  }

  openEditDialog(order: Order): void {
    console.log(order);
    const dialogRef = this.dialog.open(EditOrderDialogComponent, {
      width: '400px',
      data: { ...order }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.flag) {
        this.loadOrders();
        this.snackBar.open('Order updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  editOrder(order: Order) {
    this.openEditDialog(order);
  }

  deleteOrder(orderId: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => {
          this.snackBar.open('Order deleted successfully.', 'OK', {
            duration: 3000,
          });
          this.loadOrders();
        },
        (error) => {
          this.snackBar.open('Failed to delete order.', 'OK', {
            duration: 3000,
          });
        }
      );
    }
  }

  loadMenuItems() {
    this.menuItemService.getAllMenuItems().subscribe((items: MenuItem[]) => {
      this.menuItems = items;
    });
  }

  loadOrderItemsForAllOrders() {
    this.allOrders.forEach(order => {
      this.loadOrderItems(order.id);
    });
  }

  loadOrderItems(orderId: string) {
    const orderItems$ = this.orderItemService.getOrderItemsByOrderId(orderId);
    this.orderItemsMap.set(orderId, orderItems$);
  }

  getMenuItemName(menuItemId: string): string {
    const menuItem = this.menuItems.find(item => item.id === menuItemId);
    return menuItem ? menuItem.name : 'Unknown';
  }

  openEditOrderItemDialog(orderItem: OrderItem): void {
    const dialogRef = this.dialog.open(EditOrderItemDialogComponent, {
      width: '400px',
      data: { ...orderItem }
    });

    console.log(orderItem);
    dialogRef.afterClosed().subscribe(result => {
      if (result.flag) {
        this.loadOrders();
        this.snackBar.open('Order item updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  editOrderItem(orderItem: OrderItem) {
    this.openEditOrderItemDialog(orderItem);
  }

  deleteOrderItem(orderId: string, orderItemId: string) {
    if (confirm('Are you sure you want to delete this order item?')) {
      this.orderItemService.deleteOrderItem(orderItemId).subscribe(
        () => {
          this.snackBar.open('Order item deleted successfully.', 'OK', {
            duration: 3000,
          });
          this.loadOrderItems(orderId);
        },
        (error) => {
          this.snackBar.open('Failed to delete order item.', 'OK', {
            duration: 3000,
          });
        }
      );
    }
  }
}
