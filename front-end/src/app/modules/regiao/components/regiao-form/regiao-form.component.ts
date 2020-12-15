import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ICidade, IRegiao } from 'src/app/core/models';
import { CidadeService } from 'src/app/core/services';
import { RegiaoService } from 'src/app/core/services/regiao.service';

@Component({
  selector: 'app-regiao-form',
  templateUrl: './regiao-form.component.html',
  styleUrls: ['./regiao-form.component.scss'],
})
export class RegiaoFormComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  @Input('regiaoId') regiaoId: string;
  regiao: IRegiao;
  serviceCidades: ICidade[];

  constructor(
    private fb: FormBuilder,
    private service: RegiaoService,
    private cidadeService: CidadeService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    if (this.regiaoId) {
      this.service.getById(this.regiaoId).subscribe((regiao: IRegiao) => {
        this.regiao = regiao;
        this.setFormValues();
      });
      this.cidadeService.getAll().subscribe((cidades) => {
        this.serviceCidades = cidades;
      });
    }

    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      cidades: this.fb.array([]),
    });

    if (!this.regiaoId) {
      this.addCidade();
    }
  }

  setFormValues() {
    this.form.patchValue({
      id: this.regiao.id,
      nome: this.regiao.nome,
    });
  }

  cidades(): FormArray {
    return this.form.get('cidades') as FormArray;
  }

  newCidade(id?: string): FormGroup {
    return this.fb.group({
      id: [id, Validators.required],
    });
  }

  addCidade(id?: string) {
    this.cidades().push(this.newCidade(id));
  }

  removeCidade(i: number) {
    this.cidades().removeAt(i);
  }

  submit() {
    this.loading = true;
    const data = this.form.value;
    if (data.cidades.length > 0) {
      data.cidades = data.cidades.map((x) => (x = x.id));
      var isDuplicate = data.cidades.some(function (item, idx) {
        return data.cidades.indexOf(item) != idx;
      });
      if (isDuplicate) {
        this.messageService.create(
          'warning',
          'As cidades não podem conter duplicatas.'
        );
        return;
      }
    }

    if (this.regiaoId) {
      if (data.cidades.length == 0) {
        this.regiao.cidades.map((x: any) => {
          data.cidades.push(x.cidadeId);
        });
      }
      this.service.edit(data).subscribe(
        (result) => {
          this.loading = false;
          this.messageService.create('success', 'Região editada com sucesso!');
          this.form.reset();
        },
        (err) => {
          this.loading = false;
          this.messageService.create('warning', err.error || err.message);
        }
      );
    } else {
      this.service.add(data).subscribe(
        (result) => {
          this.loading = false;
          this.messageService.create(
            'success',
            'Região adicionada com sucesso!'
          );
          this.form.reset();
        },
        (err) => {
          this.loading = false;
          this.messageService.create('warning', err.error || err.message);
        }
      );
    }
  }

  getCidade(id) {
    if (this.serviceCidades) {
      var cidades = this.serviceCidades.filter((x: ICidade) => x.id == id);
      if (cidades) {
        return cidades[0].nome + ' - ' + cidades[0].uf;
      }
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
