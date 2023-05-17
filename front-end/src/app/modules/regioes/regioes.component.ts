import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusEnum } from 'src/app/interfaces/regiao';
import { Regiao } from 'src/app/interfaces/regiao';
import { RegiaoService } from 'src/app/services/regiao.service';

@Component({
  selector: 'regioes',
  templateUrl: './regioes.component.html',
  styleUrls: ['./regioes.component.scss']
})
export class RegioesComponent implements OnInit {
  public regioes$: Observable<Regiao[]>

  constructor(private regiaoService: RegiaoService) { }

  ngOnInit() {
    this.regioes$ = this.regiaoService.getAll();
  }

  changeStatus(regiao: Regiao) {
    if(regiao.status == StatusEnum.ATIVA) {
      regiao.status = StatusEnum.DESATIVADA;
    }
    else {
      regiao.status = StatusEnum.ATIVA;
    }
  }

}
