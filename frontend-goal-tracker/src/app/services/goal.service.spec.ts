import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GoalService } from './goal.service';
import { environment } from '../../environment';

describe('GoalService', () => {
  let service: GoalService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoalService]
    });

    service = TestBed.inject(GoalService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding requests after each test
  });

  it('should retrieve goals and return a result', () => {
    const dummyGoals = { long: [{ id: 1, title: 'Long Term Goal' }], short: [{ id: 2, title: 'Short Term Goal' }] };

    service.fetchGoals().subscribe(goals => {
      expect(goals.long.length).toBe(1);
      expect(goals.short.length).toBe(1);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/goals`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGoals);
  });

  it('should update a goal and return the updated goal', () => {
    const testGoal: any = { id: 1, title: 'Updated Goal' };

    service.updateGoal(testGoal).subscribe(goal => {
      expect(goal).toEqual(testGoal);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/goals/${testGoal.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(testGoal);
  });

  it('should create a goal and return the new goal', () => {
    const newGoal: any = { id: 3, title: 'New Goal' };

    service.createGoal(newGoal).subscribe(goal => {
      expect(goal).toEqual(newGoal);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/goals`);
    expect(req.request.method).toBe('POST');
    req.flush(newGoal);
  });

  it('should fetch the number of accomplished goals for a given id', () => {
    const count = 5;
    const id = 1;

    service.getNumberAccomplishedGoals(id).subscribe(accomplishedGoals => {
      expect(accomplishedGoals).toBe(count);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/goals/number-of-accomplished-goals?id=${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(count);
  });

  it('should complete a goal and return the updated count', () => {
    const updatedCount = 1;
    const id = 1;

    service.completeGoal(id).subscribe(result => {
      expect(result).toBe(updatedCount);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/goals/complete-${id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedCount);
  });
});