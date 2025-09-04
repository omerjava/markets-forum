import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForumThread } from '../models/forum-thread';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ForumThreadService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/threads`;

  getAll(): Observable<ForumThread[]> {
    return this.http.get<ForumThread[]>(this.apiUrl);
  }

  getById(id: number): Observable<ForumThread> {
    return this.http.get<ForumThread>(`${this.apiUrl}/${id}`);
  }

  create(thread: ForumThread): Observable<ForumThread> {
    return this.http.post<ForumThread>(this.apiUrl, thread);
  }

  update(id: number, thread: ForumThread): Observable<ForumThread> {
    return this.http.put<ForumThread>(`${this.apiUrl}/${id}`, thread);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

