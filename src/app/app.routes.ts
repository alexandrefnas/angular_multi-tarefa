import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ControleTarefasComponent } from './pages/controle-tarefas/controle-tarefas.component';
import { ControleFinanceiroComponent } from './pages/controle-financeiro/controle-financeiro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthPerfilGuard } from './guards/auth-perfil.guard';
import { CadastrouComponent } from './pages/cadastrou/cadastrou.component';
import { PerfilGuard } from './guards/perfil.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tarefas', component: ControleTarefasComponent, canActivate: [AuthGuard] },
  { path: 'financeiro', component: ControleFinanceiroComponent, canActivate: [AuthPerfilGuard] },
  {
    path: 'cadastro',
    component: CadastrouComponent,
    // canActivate: [PerfilGuard], // 🔒 Só admins
  },
  { path: '**', redirectTo: '' },
];
