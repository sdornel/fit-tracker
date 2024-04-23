import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Goal } from '../../../models/goal';

@Component({
  selector: 'app-goal-detail-modal',
  standalone: true,
  imports: [],
  templateUrl: './goal-detail-modal.component.html',
  styleUrl: './goal-detail-modal.component.css'
})
export class GoalDetailModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public goal: Goal) {console.log('goal', goal)}
}
