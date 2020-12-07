import { RouterModule, Routes } from '@angular/router';
import { RegiaoComponent } from './regiao.component';

const routes: Routes = [
  { 
    path: '',
    component: RegiaoComponent
  },
];

export const  RegiaoRoutingModule = RouterModule.forChild(routes);