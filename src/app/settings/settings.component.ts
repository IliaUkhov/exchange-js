import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from '../settings';
import { DataService } from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings$: Observable<Settings>

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.settings$ = this.dataService.getSettings()
  }

  updateSettings(newValue: Settings) {
    this.dataService.updateSettings(
      newValue,
      err => console.log("failed to update: " + JSON.stringify(err)),
      res => {}
    )
  }
}
