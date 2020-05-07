import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stock } from './stock';
import { Settings } from './settings';
import { Observable } from "rxjs";
import { Broker } from './broker';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>("http://localhost:8000/api/stocks")
  }

  updateStock(i: number, newValue: Stock, onsuccess: CallableFunction, onerror: CallableFunction) {
    this.http.post(`http://localhost:8000/api/stocks/${i}`, newValue, {
      headers: { "Content-Type": "application/json" }
    }).subscribe(
      response => onsuccess(response),
      err => onerror(err)
    )
  }

  deleteStock(i: number, onsuccess: CallableFunction, onerror: CallableFunction) {
    this.http.delete(`http://localhost:8000/api/stocks/${i}`).subscribe(
      response => onsuccess(response),
      err => onerror(err)
    )
  }


  getSettings(): Observable<Settings> {
    return this.http.get<Settings>("http://localhost:8000/api/settings")
  }

  updateSettings(newValue: Settings, onsuccess: CallableFunction, onerror: CallableFunction) {
    this.http.post("http://localhost:8000/api/settings", newValue, {
      headers: { "Content-Type": "application/json" }
    }).subscribe(
      response => onsuccess(response),
      err => onerror(err)
    )
  }


  getBrokers(): Observable<Broker[]> {
    return this.http.get<Broker[]>("http://localhost:8000/api/brokers")
  }

  updateBroker(i: number, newValue: Broker, onsuccess: CallableFunction, onerror: CallableFunction) {
    this.http.post(`http://localhost:8000/api/brokers/${i}`, newValue, {
      headers: { "Content-Type": "application/json" }
    }).subscribe(
      response => onsuccess(response),
      err => onerror(err)
    )
  }

  deleteBroker(i: number, onsuccess: CallableFunction, onerror: CallableFunction) {
    this.http.delete(`http://localhost:8000/api/brokers/${i}`).subscribe(
      response => onsuccess(response),
      err => onerror(err)
    )
  }
}
