import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegiaoComponent } from './regiao.component';
import { RegiaoRoutingModule } from './regiao.routing';
import { AntModule } from 'src/app/shared/ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegiaoFormComponent } from './components/regiao-form/regiao-form.component';
import { AddPageComponent } from './pages/add/add.page';
import { CidadePickerComponent } from './components/cidade-picker/cidade-picker.component';
import { EditPageComponent } from './pages/edit/edit.page';

@NgModule({
  imports: [
    CommonModule,
    RegiaoRoutingModule,
    AntModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RegiaoComponent,
    RegiaoFormComponent,
    AddPageComponent,
    EditPageComponent,
    CidadePickerComponent,
  ],
  exports: [RegiaoComponent],
})
export class RegiaoModule {}
