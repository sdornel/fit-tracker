import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription, catchError, first, map, of } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  isAuthenticated = false;
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  user: User | null = null;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable(); 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(loginDetails: { email: string; password: string }): void {
    this.http.post<User>(`${this.apiUrl}/login`,
      loginDetails,
      { withCredentials: true },
    )
      .pipe(
        first()
      ).subscribe(userData => {
        // need to ensure i account for null data coming back with no error
        try {
          this.userSubject.next(userData);
          this.user = userData;
          this.router.navigate(['/user']);
        } catch (error) {
          console.error('Error logging in:', error);
        }
      });
  }

  logout(): void {
    // incomplete! you need to add API route
    this.router.navigate(['/login']);
  }

  checkAuthentication(): Observable<boolean> {
    return this.http.get<User>(`${this.apiUrl}/profile`, { withCredentials: true })
      .pipe(
        map(user => {
          if (user) {
            this.user = user;
            this.userSubject.next(user);
            this.isAuthenticated$.next(true);
            return true;
          } else {
            this.user = null;
            this.userSubject.next(null);
            this.isAuthenticated$.next(false);
            return false;

          }
        }),
        catchError(error => {
          console.error('Authentication error:', error);
          this.userSubject.next(null);
          this.isAuthenticated$.next(false);
          return of(false); // remember that of is deprecated
        })
      );
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }
}
