import { Injectable, Injector, OnDestroy } from '@angular/core';
import { mergeObjects } from '../shared/utils';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';


@Injectable()
export class JbNotificationService implements OnDestroy{
     data: any;


     ngOnDestroy(): void {
     }

}