import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asistencia } from '../modelo/asistencia';

@Injectable({
  providedIn: 'root',
})
export class AsistenteService {

  public asistenciaURL = "http://localhost:8860/kkom/asistentes/";

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  public register(asistente: Asistencia) {
    return this.http.post<Asistencia>(
      this.asistenciaURL + "asistencia",
      asistente,
      this.httpOptions
    );
  }
}
