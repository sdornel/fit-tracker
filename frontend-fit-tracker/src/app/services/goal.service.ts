import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment';
import { Goal } from '../models/goal';


@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private apiUrl = `${environment.apiUrl}/goals`;

  goal: Goal | null = null;
  goalsCompleted: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private http: HttpClient,
  ) {}

  fetchGoals(): Observable<{ long: Array<Goal>; short: Array<Goal>; }> {
    return this.http.get<{ long: Array<Goal>; short: Array<Goal>; }>(`${this.apiUrl}`);
  }

  updateGoal(goal: Goal): Observable<Goal> {
    return this.http.patch<Goal>(`${this.apiUrl}/${goal.id}`, goal);
  }

  getNumberAccomplishedGoals(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/number-of-accomplished-goals`);
  }

  completeGoal(id: number): Observable<number> {
    return this.http.patch<number>(`${this.apiUrl}/complete-${id}`, { id: id });
  }
}
