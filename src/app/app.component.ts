import { Component, EnvironmentInjector, Inject, ViewContainerRef, OnInit, forwardRef } from '@angular/core';
import { defer, forkJoin, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { p_filterOptions, p_zIndex } from './config/prime';
import { ktFeedService } from './api/services/feed-services.service';
import { ktPexelsService } from './api/services/pexels-services.service';
import { ktAdsWorkerService } from './services/ads-worker.service';
import { ads } from '../ads';
import { DatabaseService } from './services/indexedDB.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
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
    private _adsWorker: ktAdsWorkerService,
    private feedApiSvc: ktFeedService,
    public idxdb: DatabaseService
  ) {
    this._config.zIndex = p_zIndex;
    this._config.filterMatchModeOptions = p_filterOptions;

    forkJoin([this._pexelsSvc.pexelsPhotosGet(), of(ads)])
      .pipe(
        switchMap(([i, a]) => this.process$({imgs: i, ads:a})),
        untilDestroyed(this),
      )
      .subscribe(res => {
        this.idxdb.setItem('Feed', res);
        this.feedApiSvc.mandatorySubjectDueToCors$.next(res);
        this._adsWorker.terminate();
      })
  }

  process$(ads) {
    return defer(() => this._adsWorker.process(ads))
  }

  ngOnInit(): void {
  }
}
