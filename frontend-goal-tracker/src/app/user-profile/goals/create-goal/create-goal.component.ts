import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { Goal } from '../../../models/goal';

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
    MatRadioModule,
    NgIf,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-goal.component.html',
  styleUrl: './create-goal.component.css'
})
// I should consider consolidating this with the edit form
export class CreateGoalComponent {
  goalForm!: FormGroup;
  minDate: Date = new Date();

  constructor(private dialogRef: MatDialogRef<CreateGoalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { long: number; short: number; }
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.goalForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      notes: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      deadline: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.dialogRef) {
      const createdGoal: Goal = {
        ...this.goalForm.value,
        completed: false,
      }
      this.dialogRef.close(createdGoal);
    }
  }
}
