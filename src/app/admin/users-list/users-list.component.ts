import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetail } from '../../interfaces/user-detail';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  users: UserDetail[] =[];
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  addUser(): void {
    this.router.navigate(['/add-user']);
  }

  editUser(userId: string): void {
    this.router.navigate(['/edit-user', userId]);
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe((items)=>{
      this.users = items
    })
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          this.snackBar.open(response.message, 'OK', {
            duration: 3000,
          });
          this.loadUsers();
        },
        (error) => {
          this.snackBar.open('Failed to delete user', 'OK', {
            duration: 3000,
          });
        }
      );
    }
    
  }

}

