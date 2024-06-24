import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MenuItem } from '../../interfaces/menu-item';
import { MenuItemService } from '../../services/menu-item.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-item-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule, CommonModule],
  templateUrl: './menu-item-dialog.component.html',
  styleUrls: ['./menu-item-dialog.component.scss']
})
export class MenuItemDialogComponent implements OnInit {
  editedMenuItem: MenuItem;
  categories: Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<MenuItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuItem,
    private menuItemService: MenuItemService,
    private categoryService: CategoryService
  ) {
    // Clone data to prevent modifying the original data
    this.editedMenuItem = { ...data };
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.menuItemService.updateMenuItem(this.editedMenuItem.id, this.editedMenuItem).subscribe(updatedMenuItem => {
      this.dialogRef.close(updatedMenuItem);
    });
  }
}
