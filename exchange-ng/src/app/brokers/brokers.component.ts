import { Component, OnInit } from '@angular/core';
import { Broker } from '../broker';
import { DataService } from '../data.service'
import { Observable } from "rxjs";

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {
  brokers$: Observable<Broker[]>;
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.brokers$ = this.dataService.getBrokers()
  }
  
  updateBroker(i: number, newValue: Broker) {
    this.dataService.updateBroker(
      i,
      newValue,
      err => console.log("failed to update: " + JSON.stringify(err)),
      res => {}
    )
  }

  deleteBroker(i: number) {
    this.dataService.deleteBroker(
      i,
      err => this.brokers$ = this.dataService.getBrokers(),
      res => this.brokers$ = this.dataService.getBrokers()
    )
  }
}
