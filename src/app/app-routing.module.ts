import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { TeamPageComponent } from './Components/team-page/team-page.component';
import { AddDetailsPageComponent } from './Components/add-details-page/add-details-page.component';
import { AddTeammatesPageComponent } from './Components/add-teammates-page/add-teammates-page.component';
import { AssignPageComponent } from './Components/assign-page/assign-page.component';

const routes: Routes = [
  {path:"Home",component:HomePageComponent,pathMatch:"full"},
  {path:"Your-Team",component:TeamPageComponent,pathMatch:"full"},
  {path:"add-details",component:AddDetailsPageComponent,pathMatch:"full"},
  {path:"add-teammates",component:AddTeammatesPageComponent,pathMatch:"full"},
  {path:"assign-tasks",component:AssignPageComponent,pathMatch:"full"},
  { path: '', redirectTo: '/Home',pathMatch:"full" }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
