import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  user: User | null = null;

  constructor(
    private http: HttpClient,
  ) {}

  updateUser(id: number, updatedUser: User): Observable<User> {
    const formData = new FormData();
    formData.append('name', updatedUser.name);
    formData.append('email', updatedUser.email);
    formData.append('password', updatedUser.password);

    if (updatedUser.photo) {
      formData.append('photo', updatedUser.photo);
    }
    return this.http.patch<User>(`${this.apiUrl}/${id}`, formData);
  }

  register(email: string, password: string): void {
    
  }
}
