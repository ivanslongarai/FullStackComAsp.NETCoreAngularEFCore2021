import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './event/event.component';
import { EventEditComponent } from './event/eventedit/eventedit.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [

  {
    path: 'user', component : UserComponent,
    children: [
      {path: 'login', component : LoginComponent},
      {path: 'registration', component : RegistrationComponent}
    ]
  },

  {path: '', redirectTo : 'dashboard', pathMatch : 'full'},
  {path: 'events', component : EventComponent, canActivate : [AuthGuard]},
  {path: 'event/:id/edit', component : EventEditComponent, canActivate : [AuthGuard]},
  {path: 'speakers', component : SpeakerComponent, canActivate : [AuthGuard]},
  {path: 'dashboard', component : DashboardComponent, canActivate : [AuthGuard]},
  {path: 'contacts', component : ContactComponent, canActivate : [AuthGuard]},
  {path: '**', redirectTo : 'dashboard', pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
