import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Goal } from '../models/goal';


@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private apiUrl = `${environment.apiUrl}/goal`;

  goal: Goal | null = null;

  constructor(
    private http: HttpClient,
  ) {}

  updateGoal(goal: Goal) {
    return this.http.patch<Goal>(`${this.apiUrl}/${goal.id}`, goal);
  }
}
