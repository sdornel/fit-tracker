import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EditGoalComponent } from './edit-goal/edit-goal.component';
import { Goal } from '../../models/goal';
import { Subscription } from 'rxjs';
import { GoalService } from '../../services/goal.service';
import { GoalDetailModalComponent } from './goal-detail-modal/goal-detail-modal.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [MatCardModule, CommonModule, NgFor, MatIconModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent implements OnDestroy {
  private subscription: Subscription | null = null; // might need to make this an array later
  longTermGoals: Array<Goal> = [ // temp data objects
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
  shortTermGoals: Array<Goal> = [ // temp data objects
    {
      id: 5,
      title: 'do 5 sit to stands',
      notes: 'lorem ipsum...',
      deadline: 'some future date',
    },
    {
      id: 6,
      title: 'do 10 squats',
      notes: 'lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...',
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
    private goalService: GoalService
  ) {

  }

  goalCompleted(event: any) {
    console.log('Goal Completed', event.target.id);
  }

  openEditGoalModal(event: any) {
    const id: number = Number(event.target.id);
    const goal = (id <= 4 ? this.longTermGoals.filter(g => g.id === id) : this.shortTermGoals.filter(g => g.id === id))[0]; // with a maximum of 8 goals per user i do not need to handle this server-side
    const dialogRef = this.dialog.open(EditGoalComponent, {
      data: goal,
    });

    dialogRef.afterClosed().subscribe((result: Goal) => {
      if (result) {
        this.handleUpdate(result);
      }
    });
  }

  openGoalViewModal(event: any) {
    const id: number = Number(event.target.parentElement.id) > 0 ? Number(event.target.parentElement.id) : Number(event.target.id);
    const goal = (id <= 4 ? this.longTermGoals.filter(g => g.id === id) : this.shortTermGoals.filter(g => g.id === id))[0]; // with a maximum of 8 goals per user i do not need to handle this server-side
    this.dialog.open(GoalDetailModalComponent, {
      data: goal,
    });

  }

  handleUpdate(goal: Goal) {
    this.subscription = this.goalService.updateGoal(goal).subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
