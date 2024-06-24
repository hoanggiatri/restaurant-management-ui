import { Component, Inject, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-order-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-order-dialog.component.html',
  styleUrl: './edit-order-dialog.component.scss'
})

export class EditOrderDialogComponent implements OnInit {
  editedOrder: Order;

  constructor(
    public dialogRef: MatDialogRef<EditOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {
    // Clone data to prevent modifying the original data
    this.editedOrder = { ...data };
  }

  ngOnInit(): void {
    // Load additional data or perform initialization if needed
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    console.log(this.editedOrder)
    this.orderService.updateOrder(this.editedOrder.id, this.editedOrder).subscribe(
      updatedOrder => {
        this.dialogRef.close(updatedOrder);
        this.snackBar.open('Order updated successfully.', 'OK', { duration: 3000 });
      },
      error => {
        this.snackBar.open('Failed to update order.', 'OK', { duration: 3000 });
      }
    );
  }
}
