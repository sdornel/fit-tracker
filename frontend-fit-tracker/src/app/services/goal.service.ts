import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Goal } from '../models/goal';


@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private apiUrl = `${environment.apiUrl}/goals`;

  goal: Goal | null = null;

  constructor(
    private http: HttpClient,
  ) {}

  fetchGoals(): Observable<{ long: Array<Goal>; short: Array<Goal>; }> {
    return this.http.get<{ long: Array<Goal>; short: Array<Goal>; }>(`${this.apiUrl}`);
  }

  updateGoal(goal: Goal) {
    return this.http.patch<Goal>(`${this.apiUrl}/${goal.id}`, goal);
  }

  getNumberAccomplishedGoals() {
    return this.http.get<number>(`${this.apiUrl}/number-of-accomplished-goals`);
  }
}
