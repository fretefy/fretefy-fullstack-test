import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICidade } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CidadeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ICidade[]> {
    return this.http.get<ICidade[]>(`${environment.apiUrl}cidade`);
  }
}
