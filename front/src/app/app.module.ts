import { StockApiService } from './services/stock-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatTable,
  MatTableModule,
  MatButton,
  MatButtonModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { ListUserComponent } from './organisms/user/list-user/list-user.component';
import { AddUserComponent } from './organisms/user/add-user/add-user.component';
import { ManageAccountComponent } from './organisms/account/manage-account.component';
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserApiService } from "./services/user-api.service";
import { AccountApiService } from "./services/account-api.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';

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
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    CdkTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [
    UserApiService,
    AccountApiService,
    StockApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
