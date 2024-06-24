import { Component, OnInit } from '@angular/core';
import { MenuItem, UpdateMenuItem } from '../../interfaces/menu-item';
import { MenuItemService } from '../../services/menu-item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItemDialogComponent } from '../../dialog/menu-item-dialog/menu-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  categories: Category[] = [];
  newMenuItem: UpdateMenuItem = { name: '', description: '', price: 0, categoryName: '' };
  selectedMenuItem: MenuItem | null = null;
  selectedCategory: string = '';

  constructor(
    private menuItemService: MenuItemService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadMenuItems();
    this.loadCategories();
  }

  openEditDialog(menuItem: MenuItem): void {
    console.log(menuItem.id);
    const dialogRef = this.dialog.open(MenuItemDialogComponent, {
      width: '400px',
      data: { ...menuItem }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Reload menu items after updating
      this.loadMenuItems();
      this.snackBar.open('Menu item updated successfully', 'Close', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center', // Position the snack bar horizontally
        verticalPosition: 'top' // Position the snack bar vertically
      });
    });
  }

  loadMenuItems(): void {
    this.menuItemService.getAllMenuItems().subscribe(menuItems => {
      this.menuItems = menuItems;
      this.filteredMenuItems = menuItems;
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryChange(e: Event): void {
    this.selectedCategory = (e.target as HTMLInputElement).value;
  }

  saveMenuItem(): void {
    // Find the selected category object by name
    const selectedCategory = this.categories.find(category => category.name === this.newMenuItem.categoryName);
    if (selectedCategory) {
      this.newMenuItem.categoryName = selectedCategory.name;
    }
    this.menuItemService.addMenuItem(this.newMenuItem).subscribe(() => {
      this.loadMenuItems();
      this.newMenuItem = { name: '', description: '', price: 0, categoryName: '' };
      this.snackBar.open('Menu item added successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }

  editMenuItem(menuItem: MenuItem): void {
    this.openEditDialog(menuItem);
  }

  deleteMenuItem(id: string | undefined): void {
    if (id) {
      this.menuItemService.deleteMenuItem(id).subscribe(() => {
        this.loadMenuItems();
        this.selectedMenuItem = null;
        this.snackBar.open('Menu item deleted successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });
    } else {
      console.error('Menu item ID is undefined.');
    }
  }

  filterMenuItemsByCategory(): void {
    if (this.selectedCategory) {
      this.menuItemService.getMenuItemsByCategory(this.selectedCategory).subscribe(menuItems => {
        this.filteredMenuItems = menuItems;
      });
    } else {
      this.filteredMenuItems = this.menuItems;
    }
  }
}
