import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LogInterceptor } from './interceptors/log.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ktFeedViewModelService } from './views/feed/feed-viewmodel.service';
import { ktPexelsService } from './api/services/pexels-services.service';
import { ktAdsWorkerService } from './services/ads-worker.service';
import { DatabaseService } from './services/indexedDB.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    ktPexelsService,
    ktAdsWorkerService,
    DatabaseService,
    ktFeedViewModelService,
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
