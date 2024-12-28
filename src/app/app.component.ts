import { Component, EnvironmentInjector, Inject, ViewContainerRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { p_filterOptions, p_zIndex } from './config/prime';
import { environment } from '../environments/environment';
import { ktFeedService } from './api/services/feed-services.service';
import { ktFeedViewModelService } from './views/feed/feed-viewmodel.service';
import { kt_INIT_FEED_SEARCH } from './config/feed';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ktFeedViewModelService]
})
export class AppComponent implements OnInit{
  title = 'Instajob';

  feedquery
  constructor(
    public appVCR: ViewContainerRef,
    private _config: PrimeNGConfig,
    private _http: HttpClient,
    private _apiSvc: ktFeedService
  ) {
    this._config.zIndex = p_zIndex;
    this._config.filterMatchModeOptions = p_filterOptions;
    this.feedquery = kt_INIT_FEED_SEARCH;
   }




ngOnInit(): void {
  this._apiSvc.apiFeedGet(this.feedquery).subscribe((data) => {
    console.log('data', data);
  })
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  // this.fetch(this.indexRepo).subscribe((data) => {
  //   console.log(data);
  // });
}


}


//------------------------------------------------------------------------------

// responsive device rotation

/*
{
  "/rss": {
       "target": "https://baladoquebec.ca/podcast-name",
       "secure": false,
       "changeOrigin": true
  }
}
"serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
        "proxyConfig": "proxy.conf.json"
    },
    "configurations": {
        "production": {
            "buildTarget": "halo-comm:build:production"
        },
        "development": {
            "buildTarget": "halo-comm:build:development"
        }
    },
    "defaultConfiguration": "development"
},

getFeedList(): Observable<any> {
    return this.http.get('/rss', { responseType: 'text' })
        .pipe(
            map(this.extractFeedList),
            catchError(this.handlerError)
        );
}




*/
//-------------------------------------------------------------------------------