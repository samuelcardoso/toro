import { ManageAccountComponent } from './organisms/account/manage-account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from "./organisms/user/add-user/add-user.component";
import { ListUserComponent } from "./organisms/user/list-user/list-user.component";

const routes: Routes = [
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'manage-account/:id', component: ManageAccountComponent },
  { path : '', component : ListUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
