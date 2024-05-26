import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoalComponent } from './create-goal.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('CreateGoalComponent', () => {
  let component: CreateGoalComponent;
  let fixture: ComponentFixture<CreateGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGoalComponent],
      providers: [MatDialogRef]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
