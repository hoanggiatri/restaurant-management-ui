import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderItem, UpdateOrderItemDto } from '../../interfaces/order-item';
import { OrderItemService } from '../../services/order-item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceResponse } from '../../interfaces/service-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuItem } from '../../interfaces/menu-item';
import { MenuItemService } from '../../services/menu-item.service';

@Component({
  selector: 'app-edit-order-item-dialog',
  standalone: true,
  imports: [FormsModule,CommonModule, MatFormFieldModule],
templateUrl: './edit-order-item-dialog.component.html',
  styleUrl: './edit-order-item-dialog.component.scss'
})
export class EditOrderItemDialogComponent implements OnInit{
  menuItems: MenuItem[] = [];
  editedOrderItem: OrderItem;
  constructor(
    public dialogRef: MatDialogRef<EditOrderItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderItem,
    private orderItemService: OrderItemService,
    private menuItemService: MenuItemService,
    private snackBar: MatSnackBar
  ) {
    this.editedOrderItem = { ...data };
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  getMenuItemName(menuItemId: string): string {
    const menuItem = this.menuItems.find(item => item.id === menuItemId);
    return menuItem ? menuItem.name : 'Unknown';
  }

  loadMenuItems() {
    this.menuItemService.getAllMenuItems().subscribe((items: MenuItem[]) => {
      this.menuItems = items;
    });
  }

  save(): void {
    console.log(this.editedOrderItem)
    this.orderItemService.updateOrderItem(this.editedOrderItem.id, this.editedOrderItem).subscribe(
      (response) => {
        this.snackBar.open(response.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.dialogRef.close(response);
      },
      (error) => {
        this.snackBar.open('Failed to update order item', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  cancel(): void {
    this.dialogRef.close({ flag: false });
  }
}
