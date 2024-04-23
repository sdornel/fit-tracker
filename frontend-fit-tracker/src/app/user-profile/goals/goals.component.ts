import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [MatCardModule, CommonModule, NgFor, MatIconModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent {
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
    }, {
      id: 3,
      title: 'live independently',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    }, {
      id: 4,
      title: 'carry my grandchildren',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    }
  ];
  shortTermGoals: Array<any> = [ // temp data objects
    {
      id: 5,
      title: 'do 5 sit to stands',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    },
    {
      id: 6,
      title: 'do 10 squats',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    },
    {
      id: 7,
      title: 'do 10 pushups',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    },
    {
      id: 8,
      title: 'walk 2 miles without pain',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    }
  ];

  constructor(
    private dialog: MatDialog,
  ) {

  }

  goalCompleted(event: any) {
    console.log('Goal Completed', event.target.id);
  }

  openEditGoalModal(event: any) {
    console.log('Editing Goal', event.target.id);
    // const dialogRef = this.dialog.open()
  }
}
