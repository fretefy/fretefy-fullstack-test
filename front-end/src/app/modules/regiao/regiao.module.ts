import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegiaoComponent } from './regiao.component';
import { RegiaoRoutingModule } from './regiao.routing';

@NgModule({
  imports: [
    CommonModule,
    RegiaoRoutingModule
  ],
  declarations: [RegiaoComponent],
  exports: [RegiaoComponent]
})
export class RegiaoModule { }
