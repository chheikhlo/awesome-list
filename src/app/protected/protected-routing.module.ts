import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Ajouter l’importation suivante :
import { PlanningComponent } from './planning/planning/planning.component';
 
const routes: Routes = [
 { path: 'planning', component: PlanningComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
