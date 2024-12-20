import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ktCacheService } from '../config/cache';

@Injectable()
export class ktMemoryCacheService implements ktCacheService {
  protected storage: Map<string, any>;

  constructor() {
    this.storage = new Map<string, any>();
  }

  get<T>(key: string, args?: any): Observable<T> {
    return of(this.storage.get(key));
  }

  set(key: string, value: any): Observable<boolean> {
    this.storage.set(key, value);
    return of(true);
  }

  remove(key: string): Observable<boolean> {
    this.storage.delete(key);
    return of(true);
  }
}
