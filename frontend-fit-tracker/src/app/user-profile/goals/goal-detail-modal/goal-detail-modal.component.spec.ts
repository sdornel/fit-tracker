import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDetailModalComponent } from './goal-detail-modal.component';

describe('GoalModalComponent', () => {
  let component: GoalDetailModalComponent;
  let fixture: ComponentFixture<GoalDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalDetailModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
