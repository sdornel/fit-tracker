import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Goal } from '../../../models/goal';

@Component({
  selector: 'app-edit-goal',
  standalone: true,
  imports: [],
  templateUrl: './edit-goal.component.html',
  styleUrl: './edit-goal.component.css'
})
export class EditGoalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public goal: Goal
  ) {

  }
}
