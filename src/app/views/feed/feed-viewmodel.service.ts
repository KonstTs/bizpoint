import { Injectable, OnInit, OnDestroy, Injector, Inject, forwardRef, InjectionToken } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ktListViewModelService, ktSearchModel } from '../../shared/structure/list/list-viewmodel.service';
import { Observable, of } from "rxjs";
import { StrictHttpResponse } from "../../api/strict-http-response";
import { IktFeedAd } from "../../api/model/feed-dto/feed-ad.model";
import { ktFeedService } from "../../api/services/feed-services.service";
import { ktBaseEntity } from "../../model/base-entity.model";
import { IktFeedSearchModel } from "../../model/search.model";
import { IktCellRenderer, kt_CELL_FORMATTER_TOKEN } from "../../services/row-cell-renderers";
import * as dummy from '../../../dummy'
import { IktFeedLine } from "../../api/model/feed-dto/feed.model";

export const kt_FEED_INIT_SEARCH_TOKEN = new InjectionToken<IktFeedSearchModel>('initFeedSearch')

@UntilDestroy()
@Injectable()   
export class ktFeedViewModelService extends ktListViewModelService<IktFeedLine> implements OnInit, OnDestroy {
    protected override getListCb = this.getList.bind(this);
    protected override getListItemCb = this.getItem.bind(this);
    columns: any;
    barchart$: any;

    constructor(
        injector: Injector,
        @Inject(kt_CELL_FORMATTER_TOKEN) public Renderer:IktCellRenderer,
        @Inject(kt_FEED_INIT_SEARCH_TOKEN) public searchModel: ktSearchModel<IktFeedSearchModel>,
        @Inject(forwardRef(() => ktFeedService)) private _apiSvc: ktFeedService
    ){
        super(injector, searchModel)
    }

    private processResponse(res){
        return res;
    }

    getList(_query?:any): Observable<IktFeedLine[]>{
        // console.log(dummy.dummy)
        return of(<any>dummy.dummy)
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
    }
}