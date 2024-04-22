import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [MatCardModule, CommonModule, NgFor, MatIconModule],
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
      title: 'run a marathon',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    }, {
      id: 2,
      title: 'squat 500lbs',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    }
  ];
  shortTermGoals: Array<any> = [ // temp data objects
    {
      id: 3,
      title: 'do 5 sit to stands',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    },
    {
      id: 4,
      title: 'do 10 squats',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    },
    {
      id: 5,
      title: 'do 10 pushups',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    },
    {
      id: 6,
      title: 'walk 2 miles without pain',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    }
  ];

  goalCompleted() {
    console.log('Goal Completed');
  }

  openEditGoalModal() {
    console.log('Editing Goal');
  }
}
