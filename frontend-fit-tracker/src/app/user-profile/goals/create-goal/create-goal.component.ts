import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-goal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './create-goal.component.html',
  styleUrl: './create-goal.component.css'
})
// I should consider consolidating this with the edit form
export class CreateGoalComponent {
  goalForm!: FormGroup;

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

  onSubmit() {}
}
