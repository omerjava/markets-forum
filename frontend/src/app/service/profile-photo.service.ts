import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfilePhoto } from '../models/profile-photo';

@Injectable({ providedIn: 'root' })
export class ProfilePhotoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/profile-photos`;

  uploadMyPhoto(file: File): Observable<ProfilePhoto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ProfilePhoto>(this.apiUrl, formData);
  }
}
