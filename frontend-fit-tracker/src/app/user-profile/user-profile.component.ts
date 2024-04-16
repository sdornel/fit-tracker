import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileEditComponent } from './edit/user-profile-edit.component';

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.authService.user;
    // this.buildForm();
  }

  toggleModal(open: boolean) {
    this.isModalOpen = open;
  }

  handleUpdate(updatedUser: any) {
    console.log('updatedUser', updatedUser);
    // this.authService.updateUser(updatedUser).subscribe({
    //   next: (user) => {
    //     this.user = user;
    //     this.toggleModal(false);
    //   },
    //   error: (error) => {
    //     console.error('Error updating user:', error);
    //     this.toggleModal(false);
    //   }
    // });
  }

  // buildForm(): void {
  //   this.profileForm = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     photo: ['']
  //   });
  // }

  // onSubmit() {
  //   console.log('Updated profile:', this.profileForm.value);
  // }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   // if (file) {
  //   //   const reader = new FileReader();
  //   //   reader.onload = (e: any) => {
  //   //     this.profileForm.controls.photo.setValue(e.target.result);
  //   //   };
  //   //   reader.readAsDataURL(file);
  //   // }
  // }
}
