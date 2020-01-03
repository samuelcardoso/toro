import { ManageAccountComponent } from './account/component/manage-account/manage-account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from "./user/component/add-user/add-user.component";
import { ListUserComponent } from "./user/component/list-user/list-user.component";

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
