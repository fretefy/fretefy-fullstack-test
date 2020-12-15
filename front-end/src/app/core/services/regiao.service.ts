import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRegiao } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RegiaoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IRegiao[]> {
    return this.http.get<IRegiao[]>(`${environment.apiUrl}regiao`);
  }

  getById(id: string): Observable<IRegiao> {
    return this.http.get<IRegiao>(`${environment.apiUrl}regiao/${id}`);
  }

  add(data: IRegiao) {
    return this.http.post<IRegiao>(`${environment.apiUrl}regiao`, data);
  }

  edit(data: IRegiao) {
    return this.http.put<IRegiao>(`${environment.apiUrl}regiao`, data);
  }

  activate(data: IRegiao) {
    data.ativa = true;
    return this.http.put<IRegiao>(`${environment.apiUrl}regiao/status`, data);
  }

  deactivate(data: IRegiao) {
    data.ativa = false;
    return this.http.put<IRegiao>(`${environment.apiUrl}regiao/status`, data);
  }
}
