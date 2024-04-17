import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription, catchError, first, map, of } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;

  user: User | null = null;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable(); 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  updateUser(updatedUser: User) {
    console.log('updatedUser', updatedUser);
  }
}
