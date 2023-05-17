import { RouterModule, Routes } from '@angular/router';
import { RegioesComponent } from './regioes.component';

const routes: Routes = [
  { 
    path: '',
    component: RegioesComponent
  },
];

export const  RegioesRoutingModule = RouterModule.forChild(routes);