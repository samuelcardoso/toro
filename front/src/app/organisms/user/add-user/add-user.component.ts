import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserApiService} from "../../../services/user-api.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userApiService: UserApiService) { }

  userForm: FormGroup;

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      balance: ['', Validators.required]
    });

  }

  onSubmit() {
    this.userApiService.create({
      name: this.userForm.controls.username.value,
      account: {
        balance: this.userForm.controls.balance.value
      }
    })
      .subscribe( data => {
        this.router.navigate(['list-user']);
      });
  }

}
