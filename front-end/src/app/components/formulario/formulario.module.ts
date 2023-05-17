import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent }     from './formulario.component';
import { FormularioRoutingModule } from './formulario.routing';
import { FormsModule }         from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CidadeSeletorComponent } from '../cidade-seletor/cidade-seletor.component';


@NgModule({
  declarations: [FormularioComponent, CidadeSeletorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormularioRoutingModule
  ], 
  exports: [FormularioComponent],
})
export class FormularioModule { }