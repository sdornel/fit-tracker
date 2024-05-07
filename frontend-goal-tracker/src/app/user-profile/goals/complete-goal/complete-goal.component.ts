import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-complete-goal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './complete-goal.component.html',
  styleUrl: './complete-goal.component.css'
})
export class CompleteGoalComponent {

}
