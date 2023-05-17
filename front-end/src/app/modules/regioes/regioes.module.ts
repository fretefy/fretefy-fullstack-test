import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegioesComponent } from './regioes.component';
import { RegioesRoutingModule } from './regioes.routing';

@NgModule({
  imports: [
    CommonModule,
    RegioesRoutingModule
  ],
  declarations: [RegioesComponent],
  exports: [RegioesComponent]
})
export class RegioesModule { }
