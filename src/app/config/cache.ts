import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { ktBrowserCacheService } from '../services/browser-cache.service';
import { ktMemoryCacheService } from '../services/memory-cache.service';

export const SESSIONSTORAGE_CACHE_TOKEN = new InjectionToken<ktCacheService>('SESSIONSTORAGE_CACHE');
export const LOCALSTORAGE_CACHE_TOKEN = new InjectionToken<ktCacheService>('LOCALSTORAGE_CACHE');
export const MEMORY_CACHE_TOKEN = new InjectionToken<ktCacheService>('MEMORY_CACHE');

export const SESSIONSTORAGE_CACHE = { provide: SESSIONSTORAGE_CACHE_TOKEN, useFactory: () => new ktBrowserCacheService(sessionStorage) };
export const LOCALSTORAGE_CACHE = { provide: LOCALSTORAGE_CACHE_TOKEN, useFactory: () => new ktBrowserCacheService(localStorage) };
export const MEMORY_CACHE = { provide: MEMORY_CACHE_TOKEN, useFactory: () => new ktMemoryCacheService() };

export interface ktCacheService {
  get<T>(key: string, args?: any): Observable<T>;
  set(key: string, value: any): Observable<boolean>;
  remove(key: string): Observable<boolean>;
}
