import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(loginDetails: { email: string; password: string }): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    sessionStorage.setItem('authenticated', 'true'); // TEMP. need to make this happen only if user data retrieved successfully (in sub/obs)
    return this.http.post<User>(`${this.apiUrl}/login`,
      loginDetails,
      httpOptions);
  }

  logout(): void {
    sessionStorage.clear();
  }

  isAuthenticated(): string | null {
    return sessionStorage.getItem('authenticated');
  }
}
