import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attachment } from '../models/attachment';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AttachmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/attachments`;

  getAll(): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(this.apiUrl);
  }

  getById(id: number): Observable<Attachment> {
    return this.http.get<Attachment>(`${this.apiUrl}/${id}`);
  }

  create(attachment: Attachment): Observable<Attachment> {
    return this.http.post<Attachment>(this.apiUrl, attachment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
