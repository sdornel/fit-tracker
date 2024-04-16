import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent {
  @Input() user: any;  // Use the appropriate user type
  @Output() updateUser = new EventEmitter<any>();
  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      photo: new FormControl('')
    });
  }

  ngOnChanges() {
    if (this.user) {
      this.userForm.setValue({
        name: this.user.name,
        email: this.user.email,
        photo: this.user.photo
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.updateUser.emit(this.userForm.value);
    }
  }
}