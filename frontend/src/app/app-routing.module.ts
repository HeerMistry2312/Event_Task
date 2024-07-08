import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { MainComponent } from './pages/main/main.component';
import { ContentComponent } from './pages/main/content/content.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventsComponent } from './pages/events/events.component';
import { EventComponent } from './pages/events/event/event.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
const routes: Routes = [
  {
    path: '', redirectTo: '/signup', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'main', component: MainComponent,
    children: [
      {
        path: '', component: ContentComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'profile', component: ProfileComponent },
          {
            path: 'events', component: EventsComponent,
          },
          {
            path: 'events/:id', component: EventComponent,
          }
        ]
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
