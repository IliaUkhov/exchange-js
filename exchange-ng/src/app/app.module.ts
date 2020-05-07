import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrokersComponent } from './brokers/brokers.component';
import { DataService } from './data.service';
import { SettingsComponent } from './settings/settings.component';
import { StocksComponent } from './stocks/stocks.component';

@NgModule({
  declarations: [
    AppComponent,
    BrokersComponent,
    SettingsComponent,
    StocksComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
