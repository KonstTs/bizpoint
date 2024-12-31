import { Injectable, OnInit, OnDestroy, Injector, Inject, forwardRef, InjectionToken, Pipe } from '@angular/core';
import { UntilDestroy } from "@ngneat/until-destroy";
import { ktListViewModelService, ktSearchModel } from '../../shared/structure/list/list-viewmodel.service';
import { defer, forkJoin, map, mergeMap, Observable, of, Subject, switchMap } from "rxjs";
import { StrictHttpResponse } from "../../api/strict-http-response";
import { IktFeedAd } from "../../api/model/feed-dto/feed-ad.model";
import { ktFeedService } from "../../api/services/feed-services.service";
import { IktFeedSearchModel } from "../../model/search.model";
import { IktCellRenderer, kt_CELL_FORMATTER_TOKEN } from "../../services/row-cell-renderers.factory";
import { ktIconListComponent } from '../../shared/structure/details/icon-list-details';
import { ktFeedWorkerService } from '../../services/feed-worker.service';


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
    favorite?: boolean;
    details?: ktIconListComponent;
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

    constructor(
        injector: Injector,
        private _feedWorker: ktFeedWorkerService,
        @Inject(kt_CELL_FORMATTER_TOKEN) public Renderer:IktCellRenderer,
        @Inject(kt_FEED_INIT_SEARCH_TOKEN) public searchModel: ktSearchModel<IktFeedSearchModel>,
        @Inject(forwardRef(() => ktFeedService)) private _apiSvc: ktFeedService,
    ){
        super(injector, searchModel)
    }

    private toWorker(_data){
        return defer(()=> this._feedWorker.process(JSON.parse(JSON.stringify(_data))));
    }

    private processResponse(ads){
        console.log('ads:', ads)
        return ads;
    }

    // peculiar cors issue at pam stiling api. 
    // pexels api works properly
    getList(_query?:any): Observable<any[]>{
        //cors issue workaround
        return this._apiSvc.mandatorySubjectDueToCors$.pipe(
            switchMap(res => forkJoin(([of(res), of(this.Renderer)]))),
            switchMap(([f, r] )=> this.toWorker([f, r]))
        ) 
        
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

