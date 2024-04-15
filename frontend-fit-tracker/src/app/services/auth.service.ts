import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, first } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  userData$ = new Subject<User>();

  constructor(private http: HttpClient) {}

  login(loginDetails: { email: string; password: string }): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    this.http.post<User>(`${this.apiUrl}/login`,
      loginDetails,
      httpOptions)
      .pipe(
        first()
      ).subscribe(userData => {
        // need to ensure i account for null data coming back with no error
        try {
          console.log('userData', userData);
          this.userData$.next(userData);
          sessionStorage.setItem('authenticated', 'true');
        } catch (error) {
          console.error('Error logging in:', error);
        }
      });
  }

  logout(): void {
    sessionStorage.clear();
  }

  isAuthenticated(): string | null {
    return sessionStorage.getItem('authenticated');
  }
}
