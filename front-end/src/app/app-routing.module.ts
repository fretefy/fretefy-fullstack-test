import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/regioes',
    pathMatch: 'full'
  },
  {
    path: 'regioes',
    loadChildren: () => import('./modules/regioes/regioes.module').then(m => m.RegioesModule)
  },
  {
    path: 'regiao',
    loadChildren: () => import('./components/formulario/formulario.module').then(m => m.FormularioModule)
  },
  {
    path: 'regiao/:id',
    loadChildren: () => import('./components/formulario/formulario.module').then(m => m.FormularioModule)
  },
  { 
    path: '**', 
    redirectTo: '/regioes' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
