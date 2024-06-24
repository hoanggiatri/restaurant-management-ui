import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { MenuItemService } from '../../services/menu-item.service';
import { CategoryService } from '../../services/category.service';
import { OrderService } from '../../services/order.service';
import { TableService } from '../../services/table.service';
import { MenuItem } from '../../interfaces/menu-item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectedMenuItem } from '../../interfaces/selected-menu-item';
import { Table } from '../../interfaces/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderItemService } from '../../services/order-item.service';
import { CreateOrderItemDto } from '../../interfaces/order-item';
import { RouterLink } from '@angular/router';
import { CreateOrderDto } from '../../interfaces/order';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  categories: Category[] = [];
  allMenuItems: MenuItem[] = [];
  menuItems: MenuItem[] = [];
  selectedItems: SelectedMenuItem[] = [];
  tables: Table[] = [];
  selectedTable: string = '';
  selectedCategory: string = '';

  constructor(
    private categoryService: CategoryService,
    private menuItemService: MenuItemService,
    private tableService: TableService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTables();
    this.loadAllMenuItems();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadTables(): void {
    this.tableService.getAllTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  loadAllMenuItems(): void {
    this.menuItemService.getAllMenuItems().subscribe(menuItems => {
      this.allMenuItems = menuItems;
    });
  }

  loadMenuItemsByCategory(categoryName: string): void {
    this.menuItems = this.allMenuItems.filter(item => item.categoryName === categoryName);
  }

  getMenuItemsByCategory(categoryName: string): MenuItem[] {
    return this.allMenuItems.filter(item => item.categoryName === categoryName);
  }

  onCategoryChange(e: Event): void {
      this.selectedCategory =  (e.target as HTMLInputElement).value;
  }

  addItem(menuItem: MenuItem): void {
    const existingItem = this.selectedItems.find(item => item.menuItem.id === menuItem.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.selectedItems.push({ menuItem, quantity: 1, description: ''});
    }
  }

  updateQuantity(menuItemId: string, quantity: number): void {
    const item = this.selectedItems.find(item => item.menuItem.id === menuItemId);
    if (item) {
      item.quantity = quantity;
    }
  }

  updateDescription(menuItemId: string, description: string): void {
    const item = this.selectedItems.find(item => item.menuItem.id === menuItemId);
    if (item) {
      item.description = description;
    }
  }

  removeItem(menuItemId: string): void {
    this.selectedItems = this.selectedItems.filter(item => item.menuItem.id !== menuItemId);
  }

  createOrder(): void {
    if (!this.selectedTable) {
    this.snackBar.open('Please select a table', 'OK', { duration: 3000 });
    return; // Return to prevent further execution
  }

    const newOrder: CreateOrderDto = {
      status: 'Pending',
      tableName: this.selectedTable
    };

    this.orderService.createOrder(newOrder).subscribe(
      (order) => {
        this.snackBar.open('Order created successfully', 'OK', { duration: 3000 });
        this.createOrderItems(order.orderId);
        this.selectedItems = [];
        this.selectedTable = ''
      },
      (error) => {
        this.snackBar.open('Failed to create order', 'OK', { duration: 3000 });
      }
    );
  }

  createOrderItems(orderId: string): void {
    this.selectedItems.forEach(item => {
      const newOrderItem: CreateOrderItemDto = {
        orderId: orderId,
        menuItemId: item.menuItem.id,
        quantity: item.quantity,
        description: item.description
      };

      this.orderItemService.createOrderItem(newOrderItem).subscribe(
        (response) => {
          this.snackBar.open("Create order completed!", 'OK', { duration: 3000 });
        },
        (error) => {
          this.snackBar.open('Failed to create order item', 'OK', { duration: 3000 });
        }
      );
    });
  }
}
