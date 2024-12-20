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
import { IktFeed } from '../../models/feed.model';
import { IktFeedEntryContent } from '../../models/feed-entry.model';


@Injectable({
  providedIn: 'root'
})
export class ktFeedService extends BaseService {

    constructor(config: ApiConfiguration, http: HttpClient) {
      super(config, http);
    }

    static readonly feedPageGetPath = '/api/vi/feed';
    static readonly feedPageByIdGetPath = '/api/vi/feed/{id}';
    static readonly feedEntryByIdGetPath = '/api/vi/feedentry/{id}';
    
    /**
    * "methodName$Response" methods provide access to the full `HttpResponse`, allowing access to response headers.
    * To access only the response body, use the one that follows it.
    */
    
    
    //page
    // .../last return 500 erroe
    apiFeedGet$Response(): Observable<StrictHttpResponse<IktFeed>> {
        const rb = new RequestBuilder(environment.ktFeedBaseURL, ktFeedService.feedPageGetPath, 'get');
        rb.header('Authorization', `Bearer ${environment.psFeedAthToken}`);
        rb.header('If-Modified-Since', '31 Dec 2023 11:56:00 +0200');

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IktFeed>)
        );
    }
   
    apiFeedGet(): Observable<IktFeed> {
        return this.apiFeedGet$Response().pipe(map((r: StrictHttpResponse<IktFeed>) => r.body as IktFeed));
    }


    //page by id
    feedPageByIdGet$Response(params?: { id:string }): Observable<StrictHttpResponse<IktFeed>> {
        const rb = new RequestBuilder(environment.ktFeedBaseURL, ktFeedService.feedPageByIdGetPath, 'get');
        rb.header('Authorization', `Bearer ${environment.psFeedAthToken}`);
        rb.header('If-Modified-Since', '31 Dec 2023 11:56:00 +0200');
        if (params) rb.path('id', params.id);

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IktFeed>)
        );
    }
   
    feedPageByIdGet(params?: { id:string }): Observable<IktFeed> {
        return this.feedPageByIdGet$Response(params).pipe(map((r: StrictHttpResponse<IktFeed>) => r.body as IktFeed));
    }


    //entry by id
    feedEntryByIdGet$Response(params?: { id:string }): Observable<StrictHttpResponse<IktFeedEntryContent>> {
        const rb = new RequestBuilder(environment.ktFeedBaseURL, ktFeedService.feedEntryByIdGetPath, 'get');
        rb.header('Authorization', `Bearer ${environment.psFeedAthToken}`);
        rb.header('If-Modified-Since', '31 Dec 2023 11:56:00 +0200');
        if (params) rb.path('id', params.id);

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IktFeedEntryContent>)
        );
    }
   
    feedEntryByIdGet(params?: { id:string }): Observable<IktFeedEntryContent> {
        return this.feedEntryByIdGet$Response(params).pipe(map((r: StrictHttpResponse<IktFeedEntryContent>) => r.body as IktFeedEntryContent));
    }

}