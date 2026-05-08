import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistente } from '../modelo/asistente';

@Injectable({ providedIn: 'root' })
export class AsistenteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8860/kkom/asistentes';

  getAsistentes(): Observable<Asistente[]> {
    return this.http.get<Asistente[]>(this.apiUrl);
  }

  addAsistente(asistente: Asistente): Observable<Asistente> {
    return this.http.post<Asistente>(this.apiUrl, asistente);
  }
}
