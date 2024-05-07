import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormGroup } from '@angular/forms';
import { UserProfileEditComponent } from './user-edit/user-profile-edit.component';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GoalsComponent } from './goals/goals.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    UserProfileEditComponent,
    GoalsComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null; // might need to make this an array later
  user: User | null = null;
  isModalOpen: boolean = false;
  profileForm!: FormGroup;

  photoUrlPath: string | ArrayBuffer = '';

  numberOfAccomplishedGoals: number = 0;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private goalService: GoalService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user;
    if (this.user?.photo) {
      this.photoUrlPath = `http://localhost:3000/${this.user.photo}`;
    }
    this.getNumberAccomplishedGoals();
  }

  openEditModalDialog(): void {
    const dialogRef = this.dialog.open(UserProfileEditComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        if (result.photo && result.photo.name) {
          this.generateDataUrlForImmediateDisplay(result);
        }
        this.handleUpdate(this.user!.id, result);
      }
    });
  }

  openDeleteModalDialog() {
    // just make "are you sure y/n" modal
    console.log('deleting account');
  }

  getNumberAccomplishedGoals(): void {
    this.goalService.getNumberAccomplishedGoals(this.authService.user!.id).subscribe((count: number) => {
      this.goalService.goalsCompleted.next(count);
    });

    this.goalService.goalsCompleted.subscribe(count => {
      this.numberOfAccomplishedGoals = count;
    })
  }

  generateDataUrlForImmediateDisplay(result: User): void {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        this.photoUrlPath = event.target.result;
      }
    };

    reader.readAsDataURL(result.photo);
  }

  handleUpdate(userId: number, updatedUser: User): void {
    // remember to consider .add in future if need be
    this.subscription = this.userService.updateUser(userId, updatedUser).subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
