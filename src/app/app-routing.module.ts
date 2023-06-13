import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { DisableLoginGuard } from './disable-login.guard';
import { OrganizationComponent } from './organization/organization.component';
import { DrivingComponent } from './driving/driving.component';
import { ApologiesComponent } from './apologies/apologies.component';
import { TestsComponent } from './tests/tests.component';
import { TakeTestComponent } from './take-test/take-test.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent, canActivate: [DisableLoginGuard]},
    { path: 'login', component: LoginComponent, canActivate: [DisableLoginGuard]},
    { path: 'organization', component: OrganizationComponent, canActivate: [AuthenticationGuard]},
    { path: 'driving', component: DrivingComponent, canActivate: [AuthenticationGuard]},
    { path: 'apologies', component: ApologiesComponent, canActivate: [AuthenticationGuard]},
    { path: 'tests', component: TestsComponent, canActivate: [AuthenticationGuard]},
    { path: 'chat', component: ChatComponent, canActivate: [AuthenticationGuard]},
    { path: 'chat/:receiver', component: ChatComponent, canActivate: [AuthenticationGuard]},
    { path: 'takeTest/:id', component: TakeTestComponent, canActivate: [AuthenticationGuard]},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
