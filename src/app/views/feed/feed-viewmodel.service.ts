import { Injectable, OnInit, OnDestroy, Injector, Inject, forwardRef, InjectionToken } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ktListViewModelService, ktSearchModel } from '../../shared/structure/list/list-viewmodel.service';
import { Observable, of } from "rxjs";
import { StrictHttpResponse } from "../../api/strict-http-response";
import { IktFeedAd } from "../../api/model/feed-dto/feed-ad.model";
import { ktFeedService } from "../../api/services/feed-services.service";
import { ktBaseEntity } from "../../model/base-entity.model";
import { IktFeedSearchModel } from "../../model/search.model";

export const kt_FEED_INIT_SEARCH_TOKEN = new InjectionToken<IktFeedSearchModel>('initFeedSearch')

@UntilDestroy()
@Injectable()   
export class ktFeedViewModelService<IktFeedLine extends ktBaseEntity> extends ktListViewModelService<IktFeedLine> implements OnInit, OnDestroy {
    protected override getListCb = this.getList.bind(this);
    protected override getListItemCb = this.getItem.bind(this);

    constructor(
        injector: Injector,
        @Inject(kt_FEED_INIT_SEARCH_TOKEN) public searchModel: ktSearchModel<IktFeedSearchModel>,
        @Inject(forwardRef(() => ktFeedService)) private _apiSvc: ktFeedService
    ){
        super(injector, searchModel)
    }

    private processResponse(res){
        return res;
    }

    getList(_query?:any): Observable<IktFeedLine[]>{
        return of(null)
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