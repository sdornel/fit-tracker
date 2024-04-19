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
  private apiUrl = `${environment.apiUrl}/users`;

  user: User | null = null;
  // private userSubject = new BehaviorSubject<User | null>(null);
  // user$ = this.userSubject.asObservable(); 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  updateUser(id: number, updatedUser: User) {
    console.log('updatedUser', updatedUser);
    const formData = new FormData();
    formData.append('name', updatedUser.name);
    formData.append('email', updatedUser.email);
    formData.append('password', updatedUser.password);

    if (updatedUser.photo) {
      formData.append('photo', updatedUser.photo);
    }
    return this.http.patch<User>(`${this.apiUrl}/${id}`, formData);
    // return this.http.patch<User>(`${this.apiUrl}/${id}`, updatedUser);
  }

  // convertArrayBufferToBase64(user: any): void {
  //   if (user.photo && user.photo.data) {
  //     const byteArray = new Uint8Array(user.photo.data);
  //     const blob = new Blob([byteArray], { type: 'image/jpeg' });
  
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       user.photoBase64 = reader.result as string;
  //     };
  //     reader.onerror = (error) => {
  //       console.error('Error converting file:', error);
  //     };
  //     reader.readAsDataURL(blob);
  //   }
  // }
}
