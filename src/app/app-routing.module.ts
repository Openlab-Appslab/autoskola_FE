import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { DisableLoginGuard } from './disable-login.guard';
import { OrganizationComponent } from './organization/organization.component';
import { DrivingComponent } from './driving/driving.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
    { path: 'registration', component: RegistrationComponent, canActivate: [DisableLoginGuard]},
    { path: 'login', component: LoginComponent, canActivate: [DisableLoginGuard]},
    { path: 'organization', component: OrganizationComponent, canActivate: [AuthenticationGuard]},
    { path: 'driving', component: DrivingComponent, canActivate: [AuthenticationGuard]},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
