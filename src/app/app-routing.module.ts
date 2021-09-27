import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { DisplayUsersComponent } from './components/display-users/display-users.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PresidioComponent } from './components/presidio/presidio.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

const routes: Routes = [
  {path: '', component: PresidioComponent},
  {path: 'displayUsers', component: DisplayUsersComponent},
  {path: 'addUser', component: AddUserComponent},
  {path: 'deleteUser', component: DeleteUserComponent},
  {path: 'about', component: AboutComponent},
  {path: 'updateUser', component: UpdateUserComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  PresidioComponent,
  DisplayUsersComponent,
  AddUserComponent,
  DeleteUserComponent,
  AboutComponent,
  NavBarComponent,
  UpdateUserComponent,
  LoginComponent
]