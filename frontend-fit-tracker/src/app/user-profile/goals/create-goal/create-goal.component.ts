import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-create-goal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgIf,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-goal.component.html',
  styleUrl: './create-goal.component.css'
})
// I should consider consolidating this with the edit form
export class CreateGoalComponent {
  goalForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateGoalComponent>,) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.goalForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      notes: new FormControl(null, [Validators.required]),
      deadline: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.dialogRef) {
      this.dialogRef.close(this.goalForm.value);
    }
  }
}
