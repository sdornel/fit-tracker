import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Goal } from '../../../models/goal';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-goal-detail-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './goal-detail-modal.component.html',
  styleUrl: './goal-detail-modal.component.css'
})
export class GoalDetailModalComponent {
  constructor(
    public dialogRef: MatDialogRef<GoalDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public goal: Goal
    ) {}

    closeDialog(): void {
      this.dialogRef.close();
    }
}
