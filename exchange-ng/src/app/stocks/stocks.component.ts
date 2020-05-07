import { Component, OnInit } from '@angular/core';

import { Stock } from '../stock';
import { Observable } from "rxjs";
import { DataService } from '../data.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stocks$: Observable<Stock[]>;
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.stocks$ = this.dataService.getStocks()
  }
  
  updateStock(i: number, newValue: Stock) {
    this.dataService.updateStock(
      i,
      newValue,
      err => console.log("failed to update: " + JSON.stringify(err)),
      res => {}
    )
  }

  deleteStock(i: number) {
    this.dataService.deleteStock(
      i,
      err => this.stocks$ = this.dataService.getStocks(),
      res => this.stocks$ = this.dataService.getStocks()
    )
  }
}
