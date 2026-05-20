import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistente } from '../modelo/asistente';
import { Asistencia } from '../modelo/asistencia';

@Injectable({
  providedIn: 'root',
})
export class AsistenteService {

  private baseUrl = 'http://localhost:8860/kkom/asistentes';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  getAsistentes(): Observable<Asistente[]> {
    return this.http.get<Asistente[]>(this.baseUrl);
  }

  addAsistente(asistente: Asistente): Observable<Asistente> {
    return this.http.post<Asistente>(this.baseUrl, asistente, this.httpOptions);
  }

  register(asistencia: Asistencia): Observable<Asistencia> {
    return this.http.post<Asistencia>(
      `${this.baseUrl}/asistencia`,
      asistencia,
      this.httpOptions
    );
  }
}
