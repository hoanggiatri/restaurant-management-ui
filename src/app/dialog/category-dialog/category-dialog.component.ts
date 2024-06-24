import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../interfaces/category';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [FormsModule,MatDialogModule],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent {
  editedCategory: Category;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoryService: CategoryService
  ) {
    // Clone data to prevent modifying the original data
    this.editedCategory = { ...data };
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.categoryService.updateCategory(this.editedCategory.id, this.editedCategory).subscribe(updatedCategory => {
      this.dialogRef.close(updatedCategory);
    });
  }
}
