import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocenteService {
  private http = inject(HttpClient); // Forma moderna de inyectar en Angular 18/19
  private apiUrl = 'http://localhost:8860/kick/docentes';

  getDocentes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
    /*const docentesMock = [
      { id: 1, nombre: 'Ana', apellido: 'Pérez' },
      { id: 2, nombre: 'Carlos', apellido: 'Gómez' },
      { id: 3, nombre: 'Lucía', apellido: 'Martínez' }
    ];
    return of(docentesMock);*/
  }

  addDocente(docente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, docente);
  }
}
