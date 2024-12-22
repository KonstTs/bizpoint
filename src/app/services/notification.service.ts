import { Injectable, Injector, OnDestroy } from '@angular/core';
import { mergeObjects } from '../config/utils';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';


@Injectable()
export class ktNotificationService implements OnDestroy{
     data: any;


     ngOnDestroy(): void {
     }

}
