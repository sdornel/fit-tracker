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
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateGoalComponent } from './create-goal/create-goal.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [MatCardModule, CommonModule, NgFor, MatIconModule, MatButtonModule, MatTooltipModule],
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
  private subscriptions: Subscription = new Subscription();

  longTermGoals: Array<Goal> = [];
  shortTermGoals: Array<Goal> = [];

  constructor(
    private dialog: MatDialog,
    private goalService: GoalService
  ) {}

  ngOnInit(): void {
    this.fetchGoals();
  }

  fetchGoals(): void {
    this.goalService.fetchGoals().subscribe(goals => {
      this.longTermGoals = goals.long;
      this.shortTermGoals = goals.short;
    });
  }

  goalCompleted(goal: Goal): void {
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

  openEditGoalModal(goal: Goal): void {
    const dialogRef = this.dialog.open(EditGoalComponent, {
      data: goal,
    });

    dialogRef.afterClosed().subscribe((result: Goal) => {
      if (result) {
        this.handleUpdate(result);
      }
    });
  }

  handleUpdate(goal: Goal): void {
    this.subscriptions?.add(
      this.goalService.updateGoal(goal).subscribe(
        (updatedGoal: Goal) => {
          const goals = updatedGoal.type === 'long' ? this.longTermGoals : this.shortTermGoals;
          const index = goals.findIndex(g => g.id === updatedGoal.id);
          if (index !== -1) {
            goals[index] = updatedGoal;
          }
        }
      )
    );
  }

  openCreateGoalModal(): void {
    const dialogRef = this.dialog.open(CreateGoalComponent, {
      data: {
        long: this.longTermGoals.length,
        short: this.shortTermGoals.length,
      }
    });

    dialogRef.afterClosed().subscribe((result: Goal) => {
      if (result) {
        this.handleCreate(result);
      }
    });
  }

  handleCreate(goal: Goal): void {
    this.subscriptions?.add(
      this.goalService.createGoal(goal).subscribe(goal => {
        goal.type === 'long' ? this.longTermGoals.push(goal) : this.shortTermGoals.push(goal);
      })
    );
  }

  openGoalViewModal(goal: Goal): void {
    this.dialog.open(GoalDetailModalComponent, {
      data: goal,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
