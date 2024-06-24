import { Component, OnInit } from '@angular/core';
import { Category, UpdateCategory } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryDialogComponent } from '../../dialog/category-dialog/category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  newCategory: UpdateCategory = { name: '', description: '' };
  selectedCategory: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  openEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
      data: { ...category }
    });

    dialogRef.afterClosed().subscribe(result => {
          this.loadCategories();
          this.snackBar.open(result.message, 'Close', {
            duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top' 
          });
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  saveCategory(): void {
    this.categoryService.addCategory(this.newCategory).subscribe(() => {
      this.loadCategories();
      this.newCategory = { name: '', description: '' };
      this.snackBar.open('Menu item added successfully', 'Close', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center', // Position the snack bar horizontally
        verticalPosition: 'top' // Position the snack bar vertically
      });
    });
  }

  editCategory(category: Category): void {
    this.openEditDialog(category);
  }

  deleteCategory(id: string | undefined){
    if (id) {
        this.categoryService.deleteCategory(id).subscribe(() => {
            this.loadCategories();
            this.selectedCategory = null;
            this.snackBar.open('Category deleted successfully', 'Close', {
              duration: 3000, // Duration in milliseconds
              horizontalPosition: 'center', // Position the snack bar horizontally
              verticalPosition: 'top' // Position the snack bar vertically
            });
        });
    } else {
        console.error('Category ID is undefined.');
    }
}
}