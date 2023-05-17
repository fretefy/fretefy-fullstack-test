import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { regioes } from '../mocks/regioes.mock';
import { Regiao } from '../interfaces/regiao';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RegiaoService {

  constructor(private router: Router) { }

  getAll() {
    return of(regioes);
  }

  getRegioesNumber() {
    return regioes.length;
  }

  getLastRegiaoId() {
    return regioes[regioes.length - 1].id;
  }

  getById(id: number) {
    return of(regioes.filter(regiao => {
      return regiao.id == id;
    }));
  }

  update(regiao: Regiao) {
    let regiaoId = regioes.findIndex(r => r.id == regiao.id)
    regioes[regiaoId].cidades = regiao.cidades;
    this.router.navigate(['/regioes']);
  }

  create(regiao: Regiao) {
    regioes.push(regiao);
    this.router.navigate(['/regioes']);
  }
}
