import { Component, OnInit } from '@angular/core';
import { CreateTableDto, Table, UpdateTableDto } from '../../interfaces/table';
import { TableService } from '../../services/table.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditTableDialogComponent } from '../../dialog/edit-table-dialog/edit-table-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  tables: Table[] = [];
  newTable: CreateTableDto = { name: '', seats: 0 };
  selectedTable: Table | null = null;

  constructor(
    private tableService: TableService, 
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.tableService.getAllTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  saveTable(): void {
    this.tableService.createTable(this.newTable).subscribe(
      response => {
        if (response.flag) {
          this.loadTables();
          this.newTable = { name: '', seats: 0 };
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        }
      },
      error => {
        console.error('Error saving table:', error);
        this.snackBar.open('Failed to save table', 'Close', { duration: 3000 });
      }
    );
  }

  openEditDialog(table: Table): void {
    const dialogRef = this.dialog.open(EditTableDialogComponent, {
      width: '250px',
      data: { ...table }
    });
    dialogRef.afterClosed().subscribe(result => {
          this.loadTables();
          this.snackBar.open(result.message, 'Close', {
            duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top' 
          });
    });
  }

  editTable(table : Table){
    this.openEditDialog(table);
  }

  updateTable(table: Table): void {
    const updateData: UpdateTableDto = { name: table.name, seats: table.seats };
    this.tableService.updateTable(table.id, updateData).subscribe(
      response => {
        if (response.flag) {
          this.loadTables();
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        }
      },
      error => {
        console.error('Error updating table:', error);
        this.snackBar.open('Failed to update table', 'Close', { duration: 3000 });
      }
    );
  }

  deleteTable(id: string): void {
    if (confirm('Are you sure you want to delete this table?')) {
      this.tableService.deleteTable(id).subscribe(
        response => {
          if (response.flag) {
            this.loadTables();
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
          } else {
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
          }
        },
        error => {
          console.error('Error deleting table:', error);
          this.snackBar.open('Failed to delete table', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
