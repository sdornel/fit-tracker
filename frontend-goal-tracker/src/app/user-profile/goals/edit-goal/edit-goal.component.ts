import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Goal } from '../../../models/goal';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-edit-goal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    NgIf,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-goal.component.html',
  styleUrl: './edit-goal.component.css'
})
export class EditGoalComponent implements OnInit {
  goalForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EditGoalComponent>,
    @Inject(MAT_DIALOG_DATA) public goal: Goal
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.goalForm = new FormGroup({
      title: new FormControl(this.goal.title, [Validators.required]),
      notes: new FormControl(this.goal.notes, [Validators.required]),
      // type: new FormControl(null, [Validators.required]),
      deadline: new FormControl(this.goal.deadline, [Validators.required]),
    });
  }

  onSubmit(): void {
    const updatedGoal = {
      ...this.goal,
      ...this.goalForm.value
    }

    if (this.dialogRef) {
      this.dialogRef.close(updatedGoal);
    }
  }
}
