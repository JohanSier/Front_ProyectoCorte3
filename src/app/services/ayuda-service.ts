import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ayuda } from '../modelo/ayuda';

@Injectable({ providedIn: 'root' })
export class AyudaService {
  private apiUrl = 'http://localhost:8860/api/ayudas';

  constructor(private http: HttpClient) {}

  registrar(ayuda: Ayuda): Observable<any> {
    return this.http.post(this.apiUrl, ayuda, { responseType: 'text' });
  }
}
