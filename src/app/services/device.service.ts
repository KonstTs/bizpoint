import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { deviceIsMobile } from '../shared/utils';
import { tap } from 'rxjs/operators';
@Injectable({providedIn:'root'})
export class ktDeviceService implements OnDestroy{
     readonly deviceIsMobile$ = new Subject<boolean>();

     isMobile$(): Observable<any> { 
          return of(null).pipe(
               switchMap(_ => of(deviceIsMobile())),
               tap(res => this.deviceIsMobile$.next(res)),
          )
     }
     ngOnDestroy(): void {
          this.deviceIsMobile$.complete()
     }
}
