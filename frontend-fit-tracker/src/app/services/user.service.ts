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
  }

  convertToBase64(data: ArrayBuffer, type: string = 'image/png'): Observable<string> {
    return new Observable(subscriber => {
        const blob = new Blob([data], { type });
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result as string;
            subscriber.next(base64data);
            subscriber.complete();
        };
        reader.onerror = (error) => subscriber.error(error);
        reader.readAsDataURL(blob);
    });
  }
}
