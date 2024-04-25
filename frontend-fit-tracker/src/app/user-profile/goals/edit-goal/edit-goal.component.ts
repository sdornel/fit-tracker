import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Goal } from '../../../models/goal';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-goal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
  ],
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
      deadline: new FormControl(this.goal.deadline, [Validators.required]),
    });
  }

  onSubmit() {
    const updatedGoal = {
      ...this.goal,
      ...this.goalForm.value
    }

    if (this.dialogRef) {
      this.dialogRef.close(updatedGoal);
    }
  }
}
