import { Component, OnInit, OnChanges, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css'],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
  ],
  standalone: true,
})
export class UserProfileEditComponent implements OnInit, OnChanges {
  userForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private dialogRef: MatDialogRef<UserProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.email]),
      password: new FormControl(this.user.password, [Validators.required]),
      photo: new FormControl(null),
    });
  }

  ngOnChanges() {
    if (this.user && this.userForm) {
      this.userForm.setValue({
        name: this.user.name,
        email: this.user.email,
      });
      if (this.user.photo) {
        this.imagePreview = this.user.photo;
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.userForm.patchValue({ photo: file });
    }
  }

  onSubmit() {
    const updatedUser = {
      ...this.user,
      ...this.userForm.value
    }
    console.log('updatedUser', updatedUser);
    if (this.dialogRef) {
      // this.dialogRef.close(updatedUser);
      const formData = new FormData();
      formData.append('user', JSON.stringify(updatedUser));
      const photo = this.userForm.value.photo;
      if (photo) {
        formData.append('file', photo, photo.name);
      }
      console.log('formData', formData);
      this.dialogRef.close(formData);
    }
  }
}
