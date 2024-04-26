import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EditGoalComponent } from './edit-goal/edit-goal.component';
import { Goal } from '../../models/goal';
import { Subscription } from 'rxjs';
import { GoalService } from '../../services/goal.service';
import { GoalDetailModalComponent } from './goal-detail-modal/goal-detail-modal.component';
import { CompleteGoalComponent } from './complete-goal/complete-goal.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [MatCardModule, CommonModule, NgFor, MatIconModule],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "longDate" }
    }
  ],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null; // might need to make this an array later

  longTermGoals!: Array<Goal>;
  shortTermGoals!: Array<Goal>;

  constructor(
    private dialog: MatDialog,
    private goalService: GoalService
  ) {}

  ngOnInit(): void {
    this.fetchGoals();
  }

  fetchGoals() {
    this.goalService.fetchGoals().subscribe(goals => {
      this.longTermGoals = goals.long;
      this.shortTermGoals = goals.short;
    });
  }

  goalCompleted(goal: Goal) {
    const dialogRef = this.dialog.open(CompleteGoalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goalService.completeGoal(goal.id).subscribe(completed => {
          if (completed) {
            goal.type === 'long' ?
            this.longTermGoals = this.longTermGoals.filter(goalIndex => goalIndex.id !== goal.id) :
            this.shortTermGoals = this.shortTermGoals.filter(goalIndex => goalIndex.id !== goal.id);
            
            const currentCount = this.goalService.goalsCompleted.value;
            this.goalService.goalsCompleted.next(currentCount + 1);
          }
        });
      }
    })
  }

  openEditGoalModal(goal: Goal) {
    const dialogRef = this.dialog.open(EditGoalComponent, {
      data: goal,
    });

    dialogRef.afterClosed().subscribe((result: Goal) => {
      if (result) {
        this.handleUpdate(result);
      }
    });
  }

  openGoalViewModal(goal: Goal) {
    this.dialog.open(GoalDetailModalComponent, {
      data: goal,
    });
  }

  handleUpdate(goal: Goal) {
    this.subscription = this.goalService.updateGoal(goal).subscribe((updatedGoal: Goal) => {
      const goals = updatedGoal.type === 'long' ? this.longTermGoals : this.shortTermGoals;
      const index = goals.findIndex(g => g.id === updatedGoal.id);
      if (index !== -1) {
        goals[index] = updatedGoal;
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
