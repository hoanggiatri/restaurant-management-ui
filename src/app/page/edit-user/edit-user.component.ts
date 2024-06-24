import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UpdateUserDTO, UserDetail } from '../../interfaces/user-detail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule],
templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  
  userId: any;
  user: UserDetail | null = null;
  updateUserDTO: UpdateUserDTO = {
    fullName: '',
    phoneNumber: ''
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe(
      { next: (data) => {
        this.user = data;
        this.updateUserDTO.fullName = data.fullName;
        this.updateUserDTO.phoneNumber = data.phoneNumber;
      },error: (error) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }

  save(){
    this.userService.updateUser(this.userId, this.updateUserDTO).subscribe(
      {
        next: (response) => {
          this.snackBar.open(response.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/admin/users']);
        },
        error: (error) => {
          this.snackBar.open(error.Message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/admin/users']);
        },
      });
  }
}
