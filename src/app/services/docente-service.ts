import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DocenteDto {
  nombre: string;
  apellido: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class DocenteService {
  private readonly url = 'http://localhost:8860/kick/docentes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DocenteDto[]> {
    return this.http.get<DocenteDto[]>(this.url);
  }

  create(docente: DocenteDto): Observable<DocenteDto> {
    return this.http.post<DocenteDto>(this.url, docente);
  }
}
