import { Observable, of } from 'rxjs';
import { JbCacheService } from '../config/cache';

export class JbBrowserCacheService implements JbCacheService {
  constructor(private _storage: Storage) {}

  get<T>(key: string, args?: any): Observable<T> {
    const val = this._storage.getItem(key);
    const res = val ? JSON.parse(val) : null;
    return of(res);
  }

  set(key: string, value: {}): Observable<boolean> {
    if(!value) return of(false);
    this._storage.setItem(key, JSON.stringify(value));
    return of(true);
    
  }

  remove(key: string): Observable<boolean> {
    this._storage.removeItem(key);
    return of(true);
  }
}
