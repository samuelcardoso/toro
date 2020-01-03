import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListUserComponent } from './user/component/list-user/list-user.component';
import { AddUserComponent } from './user/component/add-user/add-user.component';
import { ManageAccountComponent } from './account/component/manage-account/manage-account.component';
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserApiService } from "./user/service/api.service";
import { AccountApiService } from "./account/service/api.service";
import { HttpClientModule } from "@angular/common/http";
import { AngularDualListBoxModule } from 'angular-dual-listbox';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    AddUserComponent,
    ManageAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularDualListBoxModule
  ],
  providers: [UserApiService, AccountApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
