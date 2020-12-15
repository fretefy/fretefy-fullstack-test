import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { IRegiao } from 'src/app/core/models';
import { RegiaoService } from 'src/app/core/services/regiao.service';

@Component({
  selector: 'app-regiao',
  templateUrl: './regiao.component.html',
  styleUrls: ['./regiao.component.scss'],
})
export class RegiaoComponent implements OnInit {
  regioes$: Observable<IRegiao[]>;

  constructor(
    private service: RegiaoService,
    private messageService: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.regioes$ = this.service.getAll();
  }

  editar(data: IRegiao) {
    this.router.navigate(['/regiao/editar'], { queryParams: { id: data.id } });
  }

  ativar(data: IRegiao) {
    this.service.activate(data).subscribe(
      (result) => {},
      (error) => {
        this.messageService.create(
          'warning',
          'Ocorreu algum erro ao realizar esta ação, contate o suporte.'
        );
      }
    );
  }

  desativar(data: IRegiao) {
    this.service.deactivate(data).subscribe(
      (result) => {},
      (error) => {
        this.messageService.create(
          'warning',
          'Ocorreu algum erro ao realizar esta ação, contate o suporte.'
        );
      }
    );
  }
}
