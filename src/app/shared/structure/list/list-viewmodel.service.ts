import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Directive, Injector, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { ktBaseEntity } from '../../../model/base-entity.model';
import { ktNotificationService } from '../../../services/notification.service';
import { StrictHttpResponse } from '../../../api/strict-http-response';
import { ktFilterModelValues } from '../../../model/filters.model';

export interface IktBaseSearchModel { 
  filters?: string | ktFilterModelValues[];
  queryPrams?: string | HttpParams;
  sorts?: string;
  page?: number; 
  pageSize?: number;
  applyRowCount?: boolean;
}

export type ktSearchModel<T extends { [k: string]: any }> = T & {
  [K in keyof T & string as `set_${K}`]: (newValue: T[K]) => void
}


@UntilDestroy()
@Directive()
export abstract class ktListViewModelService<TModel extends ktBaseEntity> implements OnInit, OnDestroy {
    //data
    model: TModel[]
    //datastream
    source$ = new Subject<TModel[]>();
    total: number;
    spotlight: any;

    //bootstraping
    searchModel: ktSearchModel<any>;
  
    //instance restricted callbacks ensuring generic's class independence and immutability
    protected abstract getListCb(_query: any): Observable<TModel[]>;
    protected abstract getListItemCb(_id: string): Observable<any>;
    
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

  
  constructor(
    protected injector: Injector, 
    @Optional() readonly _searchModel: ktSearchModel<any>,
  ) 
    {
      this.searchModel = structuredClone(_searchModel ?? {})
      this.notificationSvc = injector.get<ktNotificationService>(ktNotificationService);
  }

    //provides raw responce
    getList$(_query?: any){
        return of(null).pipe(
          tap(() => this.emitIsBusy(true)),
          switchMap(() => this.getListCb(_query)),
          tap((res) => {
              if (!res) res = [];
              console.log('res:', res)
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
          tap((res) => !!res && (this.spotlight = res)),
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
 



