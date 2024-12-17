/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IbpFeed } from '../../models/feed.model';
import { IbpFeedEntryContent } from '../../models/feed-entry.model';


@Injectable({
  providedIn: 'root'
})
export class BpFeedService extends BaseService {

    constructor(config: ApiConfiguration, http: HttpClient) {
      super(config, http);
    }

    static readonly feedPageGetPath = '/api/vi/feed/{last}';
    static readonly feedPageByIdGetPath = '/api/vi/feed/{id}';
    static readonly feedEntryByIdGetPath = '/api/vi/feedentry/{id}';
    
    /**
    * "methodName$Response" methods provide access to the full `HttpResponse`, allowing access to response headers.
    * To access only the response body, use the one that follows it.
    */
    
    
    //page
    apiFeedGet$Response(params?: { last:string }): Observable<StrictHttpResponse<IbpFeed>> {
        const rb = new RequestBuilder(environment.bpFeedBaseURL, BpFeedService.feedPageGetPath, 'get');
        
        //auth key should be handled by interceptor
        //will implement probably
        rb.header('Authorization', `Bearer ${environment.psFeedAthToken})`);
        if (params) rb.path('last', params.last);

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IbpFeed>)
        );
    }
   
    apiFeedGet(params?: { last:string }): Observable<IbpFeed> {
        return this.apiFeedGet$Response(params).pipe(map((r: StrictHttpResponse<IbpFeed>) => r.body as IbpFeed));
    }


    //page by id
    feedPageByIdGet$Response(params?: { id:string }): Observable<StrictHttpResponse<IbpFeed>> {
        const rb = new RequestBuilder(environment.bpFeedBaseURL, BpFeedService.feedPageByIdGetPath, 'get');
        
        //auth key should be handled by interceptor
        //will implement probably
        rb.header('Authorization', `Bearer ${environment.psFeedAthToken})`);
        if (params) rb.path('last', params.id);

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IbpFeed>)
        );
    }
   
    feedPageByIdGet(params?: { id:string }): Observable<IbpFeed> {
        return this.feedPageByIdGet$Response(params).pipe(map((r: StrictHttpResponse<IbpFeed>) => r.body as IbpFeed));
    }


    //entry by id
    feedEntryByIdGet$Response(params?: { id:string }): Observable<StrictHttpResponse<IbpFeedEntryContent>> {
        const rb = new RequestBuilder(environment.bpFeedBaseURL, BpFeedService.feedEntryByIdGetPath, 'get');
        
        //auth key should be handled by interceptor
        //will implement probably
        rb.header('Authorization', `Bearer ${environment.psFeedAthToken})`);
        if (params) rb.path('last', params.id);

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IbpFeedEntryContent>)
        );
    }
   
    feedEntryByIdGet(params?: { id:string }): Observable<IbpFeedEntryContent> {
        return this.feedEntryByIdGet$Response(params).pipe(map((r: StrictHttpResponse<IbpFeedEntryContent>) => r.body as IbpFeedEntryContent));
    }

}