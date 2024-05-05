import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription, catchError, first, map, of, switchMap } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  isAuthenticated = false;
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  user!: User | null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(loginDetails: { email: string; password: string }): void {
    this.http.post<User>(`${this.apiUrl}/login`,
      loginDetails,
      { withCredentials: true },
    )
      .pipe(
        first()
      ).subscribe((userData) => {
        try {
          this.user = userData;
          sessionStorage.setItem('loggedIn', 'true');
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

  checkAuthentication(): Observable<boolean> {
    return this.http.get<User>(`${this.apiUrl}/profile`, { withCredentials: true })
      .pipe(
        map(user => {
          if (user) {
            if (user?.photo) {
              user.photoUrl = `http://localhost:3000/uploads/${user.photo}`;
            }
  
            this.user = user;
            this.isAuthenticated$.next(true);
            return true;
          } else {
              this.isAuthenticated$.next(false);
              return false;
          }
        }),
        catchError(error => {
          console.error('Authentication error:', error);
          this.isAuthenticated$.next(false);
          return of(false); // remember that of is deprecated
        }),
      );
  }


  get isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }
}
