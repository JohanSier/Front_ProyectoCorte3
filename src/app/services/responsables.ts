import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResponsableDto {
  identificacion: string;
  nombreCompleto: string;
  tieneVariosNinos: boolean;
  nombresNinos: string[];
}

@Injectable({ providedIn: 'root' })
export class ResponsablesService {
  private readonly url = 'http://localhost:8860/kkom/responsables';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ResponsableDto[]> {
    return this.http.get<ResponsableDto[]>(this.url);
  }

  create(responsable: ResponsableDto): Observable<ResponsableDto> {
    return this.http.post<ResponsableDto>(this.url, responsable);
  }
}
