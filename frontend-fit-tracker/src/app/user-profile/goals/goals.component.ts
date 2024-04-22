import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [MatCardModule, CommonModule, NgFor],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent {
  // max of 3 long term goals. maximum of 6 goals total
  // Visual cards or a list that users can click to expand
  // and view more details. Include functionality to edit 
  // goals directly from this dashboard.
  longTermGoals: Array<any> = [ // temp data objects
    {
      id: 1,
      text: 'run a marathon',
      deadline: 'some future date',
    }, {
      id: 2,
      text: 'squat 500lbs',
      deadline: 'some future date',
    }
  ];
  shortTermGoals: Array<any> = [ // temp data objects
    {
      id: 3,
      text: 'do 5 sit to stands',
      deadline: 'some future date',
    },
    {
      id: 4,
      text: 'do 10 squats',
      deadline: 'some future date',
    },
    {
      id: 5,
      text: 'do 10 pushups',
      deadline: 'some future date',
    },
    {
      id: 6,
      text: 'walk 2 miles without pain',
      deadline: 'some future date',
    }
  ];
}
