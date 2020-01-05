import { StockApiService } from './../../services/stock-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {AccountApiService} from "../../services/account-api.service";
import { Account } from 'src/app/models/account.type';
import { Stock } from 'src/app/models/stock.type';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private accountApiService: AccountApiService,
    private stockApiService: StockApiService,
    private route: ActivatedRoute) { }

  dataSource: any = new MatTableDataSource<Stock>();
  account: Account;
  stocks: Stock[];
  accountForm: FormGroup;
  displayedColumns: string[] = ['stock', 'actions'];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.accountApiService.getById(this.route.snapshot.params.id)
      .subscribe( data => {
        console.log(data);
        this.account = data;
      });

    this.stockApiService.all()
    .subscribe( data => {
      console.log(data);
      this.stocks = data;
      this.dataSource.data = this.stocks;
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
        this.accountForm.controls.amount.setValue(0);
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

  back(): void {
    this.location.back();
  };
}
