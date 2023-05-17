import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Regiao, StatusEnum } from 'src/app/interfaces/regiao';
import { regioes } from 'src/app/mocks/regioes.mock';
import { RegiaoService } from 'src/app/services/regiao.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  public regiao: Regiao = {
    id: this.getUniqueId(), nome: '', status: StatusEnum.ATIVA, cidades: []
  };
  public regioesNumber: number;
  public regiaoGroup: FormGroup;
  public isFormValid: boolean;
  public regiaoId: number;
  public cidades: any;
  public allowSave: boolean;

  constructor(
    private router: Router,
    private regiaoService: RegiaoService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
    this.getRegiaoById();
  }

  getRegiaoById() {
    this.regiaoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.regiaoId)
      this.regiaoService.getById(this.regiaoId).subscribe(regiao => {
        this.regiao = regiao[0];
      });
  }

  buildFormGroup() {
    this.regiaoGroup = new FormGroup({
      nome: new FormControl('', [Validators.required])
    });
  }

  getUniqueId() {
    this.regioesNumber = this.regiaoService.getRegioesNumber();
    if (this.regioesNumber) {
      return this.regiaoService.getLastRegiaoId() + 1;
    }
    return 1;
  }

  getCidadesUpdated(cidades: any) {
    this.cidades = cidades;
    this.regiao.cidades = this.cidades.value;
  }

  save(regiao: Regiao) {
    this.allowSave = this.allowToSave(regiao);
    if (this.regiaoId && this.allowSave) {
      this.regiaoService.update(regiao);
    }
    else if (this.allowSave) {
      this.regiaoService.create(regiao)
    }
  }

  allowToSave(regiao: Regiao) {
    if(this.regiaoExist(regiao)) {
      if (this.regiaoId)
        alert('Não foi possível editar! Já existe uma região com esse nome');
      else
        alert('Não foi possível criar! Já existe uma região com esse nome');
      return false;
    }
    else if(this.hasEmptyCidade(regiao)) {
      alert("Informe uma cidade!");
    }
    else if (this.regiao.cidades && this.cidadeExist(regiao.cidades)) {
      alert('Não foi possível criar! Algumas dessas cidades já foram cadastradas');
      return false;
    }
    else if (this.regiao.cidades && this.duplicatedCidade(regiao.cidades)) {
      alert('Não são permitidas cidades duplicadas');
      return false;
    }
    else if (!this.regiao.cidades.length) {
      alert('É necessário cadastrar ao menos uma região');
      return false;
    }
    else
      return true;
  }

  duplicatedCidade(cidadesRegiao: string[]): boolean {
    return cidadesRegiao.length !== new Set(cidadesRegiao).size;
  }

  cidadeExist(cidadesRegiao: string[]): boolean {
    return regioes.some(regiao => regiao.cidades.some(cidade => regiao.id != this.regiaoId && cidadesRegiao.includes(cidade)));
  }

  hasEmptyCidade(regiao: Regiao): boolean {
    let exist = false;
    regiao.cidades.forEach((cidade: any) => {
      if (cidade instanceof Object)
        exist = true
    });
    return exist;
  }

  regiaoExist(regiao: Regiao): boolean {
    let exist = false
    regioes.forEach(r => {
      if (regiao.id != r.id && r.nome == regiao.nome)
        exist = true
    })
    return exist
  }

  cancel() {
    this.router.navigate(['/regioes']);
  }
}
