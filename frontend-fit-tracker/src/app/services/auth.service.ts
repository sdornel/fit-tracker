import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, first } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  user$ = new Subject<User>();
  user: User | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

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
          this.user$.next(userData);
          this.user = userData;
          sessionStorage.setItem('authenticated', 'true');
          this.router.navigate(['/user']);
        } catch (error) {
          console.error('Error logging in:', error);
        }
      });
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): string | null {
    return sessionStorage.getItem('authenticated');
  }
}
