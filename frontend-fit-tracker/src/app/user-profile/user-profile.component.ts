import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileEditComponent } from './edit/user-profile-edit.component';
import { UserService } from '../services/user.service';
import {
  MatDialog,
} from '@angular/material/dialog';

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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.user = this.authService.user;
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserProfileEditComponent, {
      data: this.user,
      width: '380px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.handleUpdate(this.user!.id, result)
      this.user = result;
    });
  }

  handleUpdate(userId: number, updatedUser: User) {
    this.userService.updateUser(userId, updatedUser).subscribe();
  }
}
