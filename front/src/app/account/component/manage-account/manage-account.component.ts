import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {AccountApiService} from "../../service/api.service";

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: AccountApiService,
    private route: ActivatedRoute) { }

  account: Account;

  accountForm: FormGroup;

  ngOnInit() {
    this.apiService.getAccountById(this.route.snapshot.params.id)
      .subscribe( data => {
        console.log(data);
        this.account = data;
      });

    this.accountForm = this.formBuilder.group({
      id: [],
      add: ['', Validators.required],
      remove: ['', Validators.required]
    });

  }

  onSubmit() {
    this.apiService.updateBalance(this.account, this.accountForm.controls.amount.value)
      .subscribe( data => {
        alert('ok!');
      });
  }

}
