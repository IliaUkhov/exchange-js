import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrokersComponent } from './brokers/brokers.component';
import { SettingsComponent } from './settings/settings.component';
import { StocksComponent } from './stocks/stocks.component';


const routes: Routes = [
  { path: '', redirectTo: '/stocks', pathMatch: 'full' },
  { path: 'stocks', component: StocksComponent },
  { path: 'brokers', component: BrokersComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
