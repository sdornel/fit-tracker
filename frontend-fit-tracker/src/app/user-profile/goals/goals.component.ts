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
    
    // there are only ever 4 short term goals and 4 long term goals
    const goal = (id <= 4 ? this.longTermGoals.filter(g => g.id === id) : this.shortTermGoals.filter(g => g.id === id))[0]; // with a maximum of 8 goals per user i do not need to handle this server-side
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
