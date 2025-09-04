import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/user-profiles`;

  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.apiUrl);
  }

  getById(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${id}`);
  }

  getMyProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/me`);
  }

  updateMyProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/me`, profile);
  }

  deleteMyProfile(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me`);
  }

}

