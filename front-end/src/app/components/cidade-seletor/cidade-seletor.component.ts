import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cidade } from 'src/app/interfaces/cidade';
import { Regiao } from 'src/app/interfaces/regiao';
import { CidadeService } from 'src/app/services/cidade.service';

@Component({
  selector: 'cidade-seletor',
  templateUrl: './cidade-seletor.component.html',
  styleUrls: ['./cidade-seletor.component.scss']
})
export class CidadeSeletorComponent implements OnInit {

  @Input() regiao: Regiao;
  @Output() cidades: EventEmitter<any> = new EventEmitter();
  public cidades$: Observable<Cidade[]>;
  public cidadeGroup: FormGroup;

  constructor(
    private cidadeService: CidadeService
  ) { }

  ngOnInit(): void {
    this.buildFormGroup();
    this.getCidades();
  }

  ngOnChanges() {
    this.buildFormGroup();
  }

  buildFormGroup() {
    this.cidadeGroup = new FormGroup({
      cidades: this.buildFormArray()
    })
  }

  buildFormArray() {
    let cidades = [];
    if(this.regiao && this.regiao.cidades.length) {
      this.regiao.cidades.forEach((cidade) => {
        cidades.push(new FormControl(cidade));
      })
    }
    else {
      cidades.push(new FormControl());
    }
    return new FormArray(cidades);
  }

  getCidades() {
    this.cidades$ = this.cidadeService.getAll();
  }

  getCidadesForm() {
    return this.cidadeGroup.get('cidades') as FormArray;
  }

  addLocal() {
    let city = {} as Cidade
    this.regiao.cidades.push('');
    this.getCidadesForm().push(new FormControl(city));
    this.cidades.emit(this.cidadeGroup.get('cidades'));
  }

  removeCity(index: number) {
    let cidadesForm = this.getCidadesForm();
    this.regiao.cidades.splice(index, 1);
    if(cidadesForm.length > 1)
      cidadesForm.removeAt(index);
    this.cidades.emit(this.cidadeGroup.get('cidades'));
  }

  selectChange(value: any) {
    this.cidades.emit(this.cidadeGroup.get('cidades'));
  }

}
