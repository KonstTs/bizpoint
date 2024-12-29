/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable, Subject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IktFeed } from '../model/feed-dto/feed.model';
import { IktFeedEntryContent } from '../model/feed-dto/feed-entry.model';


@Injectable({
  providedIn: 'root'
})
export class ktFeedService extends BaseService {

    constructor(config: ApiConfiguration, http: HttpClient) {
      super(config, http);
    }

    mandatorySubjectDueToCors$ = new Subject<any>(); 

    static feedPageGetPath = '/api/vi/feed';
    static feedPageByIdGetPath = '/api/vi/feed/{id}';
    static feedEntryByIdGetPath = '/api/vi/feedentry/{id}';
    
    /**
    * "methodName$Response" methods provide access to the full `HttpResponse`, allowing access to response headers.
    * To access only the response body, use the one that follows it.
    */
    
    
    //page
    // .../last return 500 erroe
    apiFeedGet$Response(params?: { ifModifiedSince: string }): Observable<StrictHttpResponse<IktFeed>> {
        const rb = new RequestBuilder(environment.feedPathRewrite, ktFeedService.feedPageGetPath, 'get');
        rb.header('If-Modified-Since', params.ifModifiedSince);

        console.log('rb', rb);

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            tap((r: any) => console.log('r', r)),
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IktFeed>),
            tap((r: any) => console.log('r', r)),
        );
    }
   
    apiFeedGet(params?: { ifModifiedSince: string }): Observable<IktFeed> {
        return this.apiFeedGet$Response(params).pipe(map((r: StrictHttpResponse<IktFeed>) => r.body as IktFeed));
    }



    //page by id
    feedPageByIdGet$Response(params?: { id:string, ifNoneMatchPageETag: string}): Observable<StrictHttpResponse<IktFeed>> {
        const rb = new RequestBuilder(environment.feedPathRewrite, ktFeedService.feedPageByIdGetPath, 'get');
        rb.header('If-None-Match', params.ifNoneMatchPageETag);
        rb.path('id', params.id);
        
        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IktFeed>)
        );
    }
   
    feedPageByIdGet(params?: { id:string, ifNoneMatchPageETag: string}): Observable<IktFeed> {
        return this.feedPageByIdGet$Response(params).pipe(map((r: StrictHttpResponse<IktFeed>) => r.body as IktFeed));
    }



    //entry by id
    feedEntryByIdGet$Response(params?: { id:string, ifNoneMatchEntryETag: string}): Observable<StrictHttpResponse<IktFeedEntryContent>> {
        const rb = new RequestBuilder(environment.feedPathRewrite, ktFeedService.feedEntryByIdGetPath, 'get');
        rb.header('If-None-Match', params.ifNoneMatchEntryETag);
        if (params) rb.path('id', params.id);

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IktFeedEntryContent>)
        );
    }
   
    feedEntryByIdGet(params?: { id:string, ifNoneMatchEntryETag: string}): Observable<IktFeedEntryContent> {
        return this.feedEntryByIdGet$Response(params).pipe(map((r: StrictHttpResponse<IktFeedEntryContent>) => r.body as IktFeedEntryContent));
    }

}