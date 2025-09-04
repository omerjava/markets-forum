import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Like } from '../models/like';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LikeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/likes`;

  getAll(): Observable<Like[]> {
    return this.http.get<Like[]>(this.apiUrl);
  }

  getById(id: number): Observable<Like> {
    return this.http.get<Like>(`${this.apiUrl}/${id}`);
  }

  create(like: Like): Observable<Like> {
    return this.http.post<Like>(this.apiUrl, like);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

