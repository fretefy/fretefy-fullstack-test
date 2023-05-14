import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  stateOptions: { name: string }[] = [];
  selectedState: string;
  regionForm !: FormGroup
  dropdowns: any[] = [{id: 'dropdown-0'}];

  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.regionForm = this.formBuilder.group({
      stateOptions: ['', Validators.required]
    })
  }


  onRegionChange(region: string) {
    switch (region) {
      case 'Norte':
        this.stateOptions = [
          { name: 'Rio Branco' },
          { name: 'Macapá' },
          { name: 'Manaus' },
          { name: 'Belém' },
          { name: 'Porto Velho' },
          { name: 'Boa Vista' },
          { name: 'Palmas' }
        ];
        break;
      case 'Nordeste':
        this.stateOptions = [
          { name: 'Maceió' },
          { name: 'Salvador' },
          { name: 'Fortaleza' },
          { name: 'São Luís' },
          { name: 'João Pessoa' },
          { name: 'Recife' },
          { name: 'Teresina' }
        ];
        break;
      case 'Centro-Oeste':
        this.stateOptions = [
          { name: 'Goiânia' },
          { name: 'Cuiabá' },
          { name: 'Campo Grande' },
          { name: 'Anápolis' },
          { name: 'Brasília' },
          { name: 'Corumbá' },
          { name: 'Formosa' }
        ];
        break;
      case 'Sudeste':
        this.stateOptions = [
          { name: 'Vitória' },
          { name: 'Belo Horizonte' },
          { name: 'Rio de janeiro' },
          { name: 'São Paulo' },
          { name: 'Araraquara' },
          { name: 'Minas Gerais' },
          { name: 'Tres Corações' }
        ];
        break;
      case 'Sul':
      this.stateOptions = [
        { name: 'Curitiba' },
        { name: 'Porto Alegre' },
        { name: 'Joinville' },
        { name: 'Londrina' },
        { name: 'Florianópolis' },
        { name: 'londrina' },
        { name: 'itajaí' }
      ];
      break;
      default:
        this.stateOptions = [];
        break;
    }
  }

  addRegion() {
    if(this.regionForm.valid) {
      this.api.postRegion(this.regionForm.value)
      .subscribe({
        next:(res)=>{
          this.regionForm.reset();
          this.dialogRef.close("save");
        },
        error:()=> {
        }
      })
    }
    window.location.reload()
  }

  addDropdown() {
    const newId = `dropdown-${this.dropdowns.length}`;
    this.dropdowns.push({id: newId});
  }

}
