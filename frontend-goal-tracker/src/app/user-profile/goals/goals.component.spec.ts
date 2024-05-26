import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsComponent } from './goals.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GoalService } from '../../services/goal.service';
import { of } from 'rxjs';
import { Goal } from '../../models/goal';

describe('GoalsComponent', () => {
  let component: GoalsComponent;
  let fixture: ComponentFixture<GoalsComponent>;
  let goalService: GoalService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule
      ],
      providers: [GoalService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalsComponent);
    component = fixture.componentInstance;
    goalService = TestBed.inject(GoalService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch goals on initialization', () => {
    const goalData = { long: [], short: [] };
    spyOn(goalService, 'fetchGoals').and.returnValue(of(goalData));
    component.ngOnInit();
    expect(goalService.fetchGoals).toHaveBeenCalled();
    expect(component.longTermGoals).toEqual(goalData.long);
    expect(component.shortTermGoals).toEqual(goalData.short);
  });

  it('should open the edit goal modal', () => {
    const goal: Goal = { id: 1, title: 'Test Goal', notes: 'A test goal', type: 'long', deadline: 'now' };
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(goal) } as any);
    component.openEditGoalModal(goal);
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should complete a goal and update the list', () => {
    const goal: Goal = { id: 1, title: 'Test Goal', notes: 'A test goal', type: 'long', deadline: 'now' };
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    spyOn(goalService, 'completeGoal').and.returnValue(of(3));
    component.goalCompleted(goal);
    expect(dialog.open).toHaveBeenCalled();
    expect(goalService.completeGoal).toHaveBeenCalledWith(goal.id);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
