import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css'],
  imports: [ReactiveFormsModule, MatDialogModule],
  standalone: true,
})
export class UserProfileEditComponent implements OnInit, OnChanges {
  @Input() user: any;
  @Output() updateUser = new EventEmitter<any>();
  userForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor() {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      password: new FormControl(''),
      photo: new FormControl(''),
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
      id: this.user.id,
      ...this.userForm.value
    }
    this.updateUser.emit(updatedUser);
  }
}
