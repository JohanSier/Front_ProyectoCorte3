import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ColaboradorService {
  private http = inject(HttpClient); // Forma moderna de inyectar en Angular 18/19
  private apiUrl = 'http://localhost:8860/kkom/colaboradores';

  getColaboradores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
    /*const colaboradoresMock = [
      { id: 1, nombres: 'Ana', apellidos: 'Pérez' },
      { id: 2, nombres: 'Carlos', apellidos: 'Gómez' },
      { id: 3, nombres: 'Lucía', apellidos: 'Martínez' }
    ];
    return of(colaboradoresMock);*/
  }

  addColaborador(colaborador: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, colaborador);
  }

  getTiposDocumento(): Observable<{valor: string, descripcion: string}[]> {
  return this.http.get<{valor: string, descripcion: string}[]>('http://localhost:8860/kkom/enums/tipos-documento');
}
}
