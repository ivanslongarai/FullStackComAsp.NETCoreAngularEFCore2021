import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './event/event.component';
import { SpeakerComponent } from './speaker/speaker.component';

const routes: Routes = [
  {path: '', redirectTo : 'dashboard', pathMatch : 'full'},
  {path: 'events', component : EventComponent},
  {path: 'speakers', component : SpeakerComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'contacts', component : ContactComponent},
  {path: '**', redirectTo : 'dashboard', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
