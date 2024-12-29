import { Component, EnvironmentInjector, Inject, ViewContainerRef, OnInit, forwardRef } from '@angular/core';
import { defer, forkJoin, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { p_filterOptions, p_zIndex } from './config/prime';
import { environment } from '../environments/environment';
import { ktFeedService } from './api/services/feed-services.service';
import { ktFeedViewModelService } from './views/feed/feed-viewmodel.service';
import { kt_INIT_FEED_SEARCH } from './config/feed';
import { ktPexelsService } from './api/services/pexels-services.service';
import { ktAdsWorkerService } from './services/ads-worker.service';
import { ads } from '../ads';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Instajob';

  constructor(
    public appVCR: ViewContainerRef,
    private _config: PrimeNGConfig,
    private _pexelsSvc: ktPexelsService,
    private _adsWorker: ktAdsWorkerService
  ) {
    this._config.zIndex = p_zIndex;
    this._config.filterMatchModeOptions = p_filterOptions;

    forkJoin([this._pexelsSvc.pexelsPhotosGet(), of(ads)])
      .pipe(
        switchMap(([i, a]) => this.process$({imgs: i, ads:a})),
      )
      .subscribe(res => {
        console.log('res:', res);
      })
  }



  process$(ads) {
    // console.log('ads:', ads)
    return defer(() => this._adsWorker.process(ads))
  }


  ngOnInit(): void {
  }
}