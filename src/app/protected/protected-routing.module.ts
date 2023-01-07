import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ParametersComponent } from './parameters/parameters/parameters.component';
// Ajouter l’importation suivante :
import { PlanningComponent } from './planning/planning/planning.component';
import { ProfilComponent } from './profil/profil/profil.component';
import { WorkdayComponent } from './workday/workday/workday.component';
import { ProtectedComponent } from './protected.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  {
  path: 'app',
  component: ProtectedComponent, 
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
   { path: 'dashboard', component: DashboardComponent },
   { path: 'parameters', component: ParametersComponent, canActivate: [RoleGuard] },
   { path: 'planning', component: PlanningComponent },
   { path: 'profil', component: ProfilComponent },
   { path: 'workday', component: WorkdayComponent },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
