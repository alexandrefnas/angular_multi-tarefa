import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CadastroTarefasComponent } from './pages/cadastro-tarefas/cadastro-tarefas.component';
import { ControleTarefasComponent } from './pages/controle-tarefas/controle-tarefas.component';
import { ControleFinanceiroComponent } from './pages/controle-financeiro/controle-financeiro.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'teste',
    component: CadastroTarefasComponent,
  },
  {
    path: 'tarefas',
    component: ControleTarefasComponent,
  },
  {
    path: 'financeiro',
    component: ControleFinanceiroComponent
,
  },

];
