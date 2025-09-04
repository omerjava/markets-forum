import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TagService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tags`;

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }

  getById(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}/${id}`);
  }

  create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, tag);
  }

  update(id: number, tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/${id}`, tag);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
