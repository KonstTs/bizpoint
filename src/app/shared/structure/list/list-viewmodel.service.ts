import { HttpErrorResponse } from '@angular/common/http';
import { Directive, InjectionToken, Injector, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of, Subject } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { ktBaseEntity } from '../../../config/base-entity';
import { mergeObjects } from '../../utils';
import { MatTableDataSource } from '@angular/material/table';
import { ktNotificationService } from '../../../services/notification.service';
import { StrictHttpResponse } from '../../../api/strict-http-response';
import { ktBaseListOptions } from '../../../config/list';


export type ktListOptions = {
  groupBy?: string;
  orderBy?: string;
  pageSize?: number;
  atPage?: [id?:string, index?:number];
  layoutMode?: 'row' | 'grid';
  useCache?: boolean;
  filterBy?: (term) => void;
};


@UntilDestroy()
@Directive()
export abstract class ktListViewModelService<TModel extends ktBaseEntity> implements OnInit, OnDestroy {
    //raw responce
    model: TModel[]
    //datastream
    source$ = new Subject<TModel[]>();
    spotlightItem: any;
    //list bootstraping resources
    options: ktListOptions;
    totalEntries: number;
  
    //instance restricted callbacks ensuring generic's class independence and immutability
    protected abstract getListCb(_query: any): Observable<TModel[]>;
    protected abstract getListItemCb(_id: string): Observable<TModel>;
    
    abstract search(_term: string): Observable<TModel[]>;
    abstract delete(_id: string): Observable<StrictHttpResponse<void>>;
    
    //global notification 
    notificationSvc: ktNotificationService;
  
    //publishing class availability
    protected _isBusy$ = new Subject<boolean>();
    emitIsBusy(isBusy: boolean): void {
        this._isBusy$.next(isBusy);
    }
    get isBusy$(): Observable<boolean> {
      return this._isBusy$.asObservable();
    }

  
  constructor(protected injector: Injector, _options: ktListOptions = {}) 
    {
      this.options = mergeObjects(structuredClone(ktBaseListOptions), _options),
      this.notificationSvc = injector.get<ktNotificationService>(ktNotificationService);
  }

    //provides raw responce
    getList$(_query?: any){
        return of(null).pipe(
          tap(() => this.emitIsBusy(true)),
          switchMap(() => this.getListCb(_query)),
          tap((res) => {
              if (!res) res = [];
              this.model = res;
              this.source$.next(this.model);
          }),
            untilDestroyed(this),
            finalize(() => {
                this.emitIsBusy(false);
            })
        )
    }

    //provide item
    getListItem$(_id?: string){
      return of(null).pipe(
          tap(() => this.emitIsBusy(true)),
          switchMap(() => this.getListItemCb(_id)),
          tap((res) => !!res && (this.spotlightItem = res)),
          untilDestroyed(this),
          finalize(() => {
            this.emitIsBusy(false);
          })
        )
    }


    // basic error handling utilizing global notification svc
    handleError$(error: HttpErrorResponse): void {
      // handle message and provide strings;
      // this.notificationSvc.alert({title:'Bummer', severity: 'error'})
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
      this._isBusy$.complete();
      this.source$.complete();
    }
 
   
  }
 



