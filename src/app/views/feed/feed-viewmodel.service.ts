import { Injectable, OnInit, OnDestroy, Injector, Inject, forwardRef, InjectionToken, Pipe } from '@angular/core';
import { UntilDestroy } from "@ngneat/until-destroy";
import { ktListViewModelService, ktSearchModel } from '../../shared/structure/list/list-viewmodel.service';
import { defer, forkJoin, map, mergeMap, Observable, of, Subject, switchMap, tap } from "rxjs";
import { StrictHttpResponse } from "../../api/strict-http-response";
import { IktFeedAd } from "../../api/model/feed-dto/feed-ad.model";
import { ktFeedService } from "../../api/services/feed-services.service";
import { IktFeedSearchModel } from "../../model/search.model";
import { ICurrencyFormatter, IktCellRenderer, kt_CELL_FORMATTER_TOKEN } from "../../services/row-cell-renderers.factory";
import { ktIconListComponent } from '../../shared/structure/details/icon-list-details';
import { ktFeedWorkerService } from '../../services/feed-worker.service';
import { fIlterObjs } from '../../config/utils';


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
    CurrencyFormatter:ICurrencyFormatter;

    constructor(
        injector: Injector,
        private _feedWorker: ktFeedWorkerService,
        @Inject(kt_CELL_FORMATTER_TOKEN) public Renderer:IktCellRenderer,
        @Inject(kt_FEED_INIT_SEARCH_TOKEN) public searchModel: ktSearchModel<IktFeedSearchModel>,
        @Inject(forwardRef(() => ktFeedService)) private _apiSvc: ktFeedService,
    ){
        super(injector, searchModel)
        this.Renderer.CurrencyFormatter.setCurrency('NOK')
    }

    

    private processResponse(ads){
        return ads;
    }

    private toWorker(_data){
        return defer(()=> this._feedWorker.process(_data));
    }
    // peculiar cors issue at pam stiling api. 
    // pexels api works properly
    getList(_query?:any): Observable<any[]>{
        //cors issue workaround
        return this._apiSvc.mandatorySubjectDueToCors$.pipe(
            switchMap(res => this.toWorker(res))
        ) 
    }

    filter(_term: string): Observable<any[]> {
        return this.source$.pipe(
            switchMap(_model => of(fIlterObjs(({title}) => title.includes(_term))(_model))),
                tap(m => ((this.model = m), (this.source$.next(m)))
            )
        )
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
        this._apiSvc.mandatorySubjectDueToCors$.complete();
        this._feedWorker.terminate()
    }
}

