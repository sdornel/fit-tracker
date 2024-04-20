import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormGroup } from '@angular/forms';
import { UserProfileEditComponent } from './user-edit/user-profile-edit.component';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, DatePipe, UserProfileEditComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  isModalOpen: boolean = false;
  profileForm!: FormGroup;

  photoUrlPath: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.user = this.authService.user;
    if (this.user?.photo) {
      this.photoUrlPath = `http://localhost:3000/${this.user.photo}`;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserProfileEditComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.handleUpdate(this.user!.id, result);
        this.user = result;
      }
    });
  }

  handleUpdate(userId: number, updatedUser: User) {
    this.userService.updateUser(userId, updatedUser).subscribe();
  }
}
