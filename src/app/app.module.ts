import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { TeamPageComponent } from './Components/team-page/team-page.component';
import { AddDetailsPageComponent } from './Components/add-details-page/add-details-page.component';
import { AddTeammatesPageComponent } from './Components/add-teammates-page/add-teammates-page.component';
import { AssignPageComponent } from './Components/assign-page/assign-page.component';
import { GoBackButtonComponent } from './Components/go-back-button/go-back-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    TeamPageComponent,
    AddDetailsPageComponent,
    AddTeammatesPageComponent,
    AssignPageComponent,
    GoBackButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
