import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { JbBrowserCacheService } from '../services/browser-cache.service';
import { JbMemoryCacheService } from '../services/memory-cache.service';

export const SESSIONSTORAGE_CACHE_TOKEN = new InjectionToken<JbCacheService>('SESSIONSTORAGE_CACHE');
export const LOCALSTORAGE_CACHE_TOKEN = new InjectionToken<JbCacheService>('LOCALSTORAGE_CACHE');
export const MEMORY_CACHE_TOKEN = new InjectionToken<JbCacheService>('MEMORY_CACHE');

export const SESSIONSTORAGE_CACHE = { provide: SESSIONSTORAGE_CACHE_TOKEN, useFactory: () => new JbBrowserCacheService(sessionStorage) };
export const LOCALSTORAGE_CACHE = { provide: LOCALSTORAGE_CACHE_TOKEN, useFactory: () => new JbBrowserCacheService(localStorage) };
export const MEMORY_CACHE = { provide: MEMORY_CACHE_TOKEN, useFactory: () => new JbMemoryCacheService() };

export interface JbCacheService {
  get<T>(key: string, args?: any): Observable<T>;
  set(key: string, value: any): Observable<boolean>;
  remove(key: string): Observable<boolean>;
}
