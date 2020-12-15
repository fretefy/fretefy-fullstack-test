import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './pages/add/add.page';
import { EditPageComponent } from './pages/edit/edit.page';
import { RegiaoComponent } from './regiao.component';

const routes: Routes = [
  {
    path: '',
    component: RegiaoComponent,
  },
  {
    path: 'adicionar',
    component: AddPageComponent,
  },
  {
    path: 'editar',
    component: EditPageComponent,
  },
];

export const RegiaoRoutingModule = RouterModule.forChild(routes);
