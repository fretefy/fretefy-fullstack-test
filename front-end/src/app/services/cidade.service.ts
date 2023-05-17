import { Injectable } from '@angular/core';
import { of }         from 'rxjs';
import { cidades }    from '../mocks/cidades.mock';


@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor() { }

  getAll() {
    return of(cidades);
  }
}
