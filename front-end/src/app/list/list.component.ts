import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../api.service';
import { datamodel } from './models';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  cadastroform!: FormGroup;
  data: undefined | datamodel[];

  faSearch = faSearch;
  faGears = faGears;
  searchTerm: string = '';

  constructor(private formbuilder: FormBuilder, private api: ApiService) {

  }

  ngOnInit(): void {
    this.cadastroform = this.formbuilder.group({
      regiao: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      cep: ['', [Validators.required, this.checkUniqueCep.bind(this)]],
    })
    this.getcadastro();
  }

  checkUniqueCep(control: AbstractControl): ValidationErrors | null {
    const enteredCep = control.value;

    if (this.data && enteredCep) {
      const existingCadastro = this.data.find((cadastro) => cadastro.cep === enteredCep);

      if (existingCadastro) {
        return { uniqueCep: true };
      }
    }

    return null;
  }

  addcadastro(data: datamodel) {
    // console.log(data)
    this.api.addcadastro(data).subscribe((res => {
      this.cadastroform.reset();
    }))
    this.getcadastro();
  }

  getcadastro() {
    this.api.getcadastro().subscribe(res => {
      this.data = res
    })
  }

  deletecadastro(data: number) {
    this.api.deletecadastro(data).subscribe(res => {
    this.getcadastro();
  })
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();
  
    if (value === '') {
      this.getcadastro();
    } else if (this.data) {
      this.data = this.data.filter((cadastro) => {
        return cadastro.regiao.toLowerCase().includes(value);
      });
    }
  }
}
