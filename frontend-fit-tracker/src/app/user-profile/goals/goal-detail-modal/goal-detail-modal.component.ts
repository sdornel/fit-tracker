import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-goal-detail-modal',
  standalone: true,
  imports: [],
  templateUrl: './goal-detail-modal.component.html',
  styleUrl: './goal-detail-modal.component.css'
})
export class GoalDetailModalComponent {
  constructor(private dialog: MatDialog) {}
}
