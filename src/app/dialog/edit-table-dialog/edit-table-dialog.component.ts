import { Component, Inject } from '@angular/core';
import { Table } from '../../interfaces/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableService } from '../../services/table.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-table-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-table-dialog.component.html',
  styleUrl: './edit-table-dialog.component.scss'
})
export class EditTableDialogComponent {
  editedTable: Table;

  constructor(
    public dialogRef: MatDialogRef<EditTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Table,
    private tableService: TableService
  ) {
    // Clone data to prevent modifying the original data
    this.editedTable = { ...data };
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.tableService.updateTable(this.editedTable.id, this.editedTable).subscribe(updatedTable => {
      this.dialogRef.close(updatedTable);
    });
  }
}
