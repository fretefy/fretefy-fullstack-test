import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario.component';

const routes: Routes = [
  { 
    path: '',
    component: FormularioComponent
  },
];

export const  FormularioRoutingModule = RouterModule.forChild(routes);