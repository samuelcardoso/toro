import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../../models/user.model";
import {UserApiService} from "../../../services/user-api.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(
    private router: Router,
    private userApiService: UserApiService) { }

  users: User[];

  ngOnInit() {
    // if(!window.localStorage.getItem('token')) {
    //   this.router.navigate(['login']);
    //   return;
    // }
    this.userApiService.all()
      .subscribe( data => {
        console.log(data);
        this.users = data;
      });
  }

  manageAccount(user: User): void {
    this.router.navigate([`manage-account/${user.account.id}`]);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}
