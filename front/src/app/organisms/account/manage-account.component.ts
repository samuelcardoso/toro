import { StockApiService } from './../../services/stock-api.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {AccountApiService} from "../../services/account-api.service";
import { Account } from 'src/app/models/account.type';
import { Stock } from 'src/app/models/stock.type';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountApiService: AccountApiService,
    private stockApiService: StockApiService,
    private route: ActivatedRoute) { }

  account: Account;
  stocks: Stock[];
  accountForm: FormGroup;
  displayedColumns: string[] = ['stock', 'actions'];

  ngOnInit() {
    this.accountApiService.getById(this.route.snapshot.params.id)
      .subscribe( data => {
        console.log(data);
        this.account = data;
      });

    this.stockApiService.all()
    .subscribe( data => {
      console.log(data);
      this.stocks = data;
    });

    this.accountForm = this.formBuilder.group({
      id: [],
      amount: ['', Validators.required]
    });
  }

  onSubmit() {
    this.accountApiService.updateBalance(this.account, this.accountForm.controls.amount.value)
      .subscribe( data => {
        this.account.balance += this.accountForm.controls.amount.value;
      });
  }

  buy(stockName) {
    this.accountApiService.buyStock(this.account, stockName)
      .subscribe( data => {
        this.account.balance = data;
        if(!this.account.stocks) {
          this.account.stocks = [];
        }
        this.account.stocks.push({
          name: stockName
        });
      });
  }

  sell(stockName) {
    this.accountApiService.sellStock(this.account, stockName)
      .subscribe( data => {
        this.account.balance = data;
        if(!this.account.stocks) {
          this.account.stocks = [];
        }
        this.account.stocks = this.account.stocks.filter(o => o.name !== stockName);
      });
  }

  isStockBought(stockName) {
    if(!this.account.stocks) {
      return false;
    }
    return this.account.stocks.filter(o => o.name === stockName).length > 0;
  }
}
