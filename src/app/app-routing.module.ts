import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from 'src/app/user/user.component'
import { AuthenticationGuard } from './guard/authentication.guard';
import { TaskComponent } from 'src/app/task/task.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from 'src/app/contact/contact.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'task', component: TaskComponent},
  { path: 'task/list', component: TaskComponent, canActivate: [AuthenticationGuard]},
  { path: 'home', component: HomeComponent,canActivate: [AuthenticationGuard]},
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
