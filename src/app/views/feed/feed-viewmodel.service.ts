import { Injectable, OnInit, OnDestroy, Injector, Inject, forwardRef, InjectionToken, Pipe } from '@angular/core';
import { UntilDestroy } from "@ngneat/until-destroy";
import { ktListViewModelService, ktSearchModel } from '../../shared/structure/list/list-viewmodel.service';
import { map, Observable, of, Subject, switchMap } from "rxjs";
import { StrictHttpResponse } from "../../api/strict-http-response";
import { IktFeedAd } from "../../api/model/feed-dto/feed-ad.model";
import { ktFeedService } from "../../api/services/feed-services.service";
import { ktBaseEntity } from "../../model/base-entity.model";
import { IktFeedSearchModel } from "../../model/search.model";
import { IktCellRenderer, kt_CELL_FORMATTER_TOKEN } from "../../services/row-cell-renderers.factory";
import {ads} from '../../../ads'
import { IktFeedLine } from "../../api/model/feed-dto/feed.model";
import { ktModelChangeArgs } from "../../model/model-state-args.model";

export const kt_FEED_INIT_SEARCH_TOKEN = new InjectionToken<IktFeedSearchModel>('initFeedSearch');
export interface IktFeedRow {
    id: string;
    title?: string;
    description?: string;
    location: string;
    employer?: string;
    salary?: string
    rating?: number;
    img?: string;
    favorite: boolean;
} 

@UntilDestroy()
@Injectable()   
export class ktFeedViewModelService extends ktListViewModelService<IktFeedRow> implements OnInit, OnDestroy {
    protected getListCb = this.getList.bind(this);
    protected getListItemCb = this.getItem.bind(this);
    entityRoute = 'feed';
    columns: any;
    barchart$: any;
    modelChanged$ = new Subject();

    protected modelChanged(change: ktModelChangeArgs<IktFeedRow[]>): void {
        // super.modelChanged(change);
        // this.modelProxySvc.suspendChangeNotifications();
        // check which fragment of model has changed 
        // eg if(change.propertyPath === 'modelproperty')
        // and do some fancy stuff like update state, run validations
        // cache, send notifications etc
        // this.modelProxySvc.resumeChangeNotifications();
        // communicate the new state to whoever it might concern,
        // this.modelChanged$.next()
        // eg the attached component
    }

    constructor(
        injector: Injector,
        @Inject(kt_CELL_FORMATTER_TOKEN) public Renderer:IktCellRenderer,
        @Inject(kt_FEED_INIT_SEARCH_TOKEN) public searchModel: ktSearchModel<IktFeedSearchModel>,
        @Inject(forwardRef(() => ktFeedService)) private _apiSvc: ktFeedService
    ){
        super(injector, searchModel)
    }

    private processResponse(ads){
        console.log('ads:', ads)
        return ads;
    }

    // peculiar cors issue at pam stiling api. 
    // pexels api works properly
    getList(_query?:any): Observable<any[]>{
        //cors issue workaround
        return this._apiSvc.mandatorySubjectDueToCors$.pipe(switchMap(res => of(res)));
        
        // proper implementation should be sth like this 
        // this.decacheDB('Feed').pipe(
        //       catchError(err => {
        //         return of(null);
        //       }),
        //       switchMap(cached => {
        //         if (cached) return of(cached);
        //         return forkJoin([this._pexelsSvc.pexelsPhotosGet(), of(ads)])
        //       }),
        //       switchMap(([i, a]) => this.process$({ imgs: i, ads: a })),
        //       tap(res => this.feedApiSvc.mandatorySubjectDueToCors$.next(res)),
        //     )
        //       .subscribe(res => {
        //         this.idxdb.setItem('Feed', res);
        //       })

    }
    
    getItem(id:string): Observable<IktFeedAd>{
        return of(null)
    }
    
    search(_term: string): Observable<any[]> {
        return of(null)
    }
    delete(_id: string): Observable<StrictHttpResponse<void>> {
        return of(void 0)
    }

    ngOnInit(): void {
        super.ngOnInit()
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.modelChanged$.complete();
    }
}