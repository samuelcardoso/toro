import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../../models/user.model";
import { UserApiService } from "../../../services/user-api.service";
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(
    private router: Router,
    private userApiService: UserApiService) { }

  dataSource: any = new MatTableDataSource<User>();
  displayedColumns: string[] = ['name', 'balance', 'actions'];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.userApiService.all()
      .subscribe( data => {
        console.log(data);
        this.dataSource.data = data;
      });
  }

  manageAccount(user: User): void {
    this.router.navigate([`manage-account/${user.account.id}`]);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}
