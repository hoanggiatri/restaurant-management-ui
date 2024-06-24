import { Component } from '@angular/core';
import { AddUserDTO, UserDetail } from '../../interfaces/user-detail';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})

export class AddUserComponent {
  user: AddUserDTO = { fullName: '', email: '', phoneNumber: '', password: '' };

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  saveUser(): void {
    this.userService.createUser(this.user).subscribe(
      (response) => {
        this.snackBar.open(response.message, 'OK', {
          duration: 3000,
        });
        this.router.navigate(['/admin/users']);
      },
      (error) => {
        this.snackBar.open('Failed to add user', 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
