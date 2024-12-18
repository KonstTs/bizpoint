import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { p_filterOptions, p_zIndex } from './config/prime';
import { BpFeedService } from './api/services/feed-services.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'bizpoint';
  constructor(
    private _config: PrimeNGConfig,
    private _feedSvc:BpFeedService
  ) {
    this._config.zIndex = p_zIndex;
    this._config.filterMatchModeOptions = p_filterOptions;
    this._feedSvc.apiFeedGet().pipe(untilDestroyed(this)).subscribe(res => { 
      console.log('res:', res)
    })
   }

  ngOnInit(): void {
    
  } 
}
