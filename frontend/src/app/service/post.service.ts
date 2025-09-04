import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/posts`;

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  update(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
