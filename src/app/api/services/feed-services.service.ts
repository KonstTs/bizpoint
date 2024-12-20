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
import { IjbFeed } from '../../models/feed.model';
import { IjbFeedEntryContent } from '../../models/feed-entry.model';


@Injectable({
  providedIn: 'root'
})
export class JbFeedService extends BaseService {

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
    apiFeedGet$Response(params?: { last?:string }): Observable<StrictHttpResponse<IjbFeed>> {
        const rb = new RequestBuilder(environment.JbFeedBaseURL, JbFeedService.feedPageGetPath, 'get');
        if (params) rb.path('last', params.last);

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IjbFeed>)
        );
    }
   
    apiFeedGet(params?: { last?:string }): Observable<IjbFeed> {
        return this.apiFeedGet$Response(params).pipe(map((r: StrictHttpResponse<IjbFeed>) => r.body as IjbFeed));
    }


    //page by id
    feedPageByIdGet$Response(params?: { id:string }): Observable<StrictHttpResponse<IjbFeed>> {
        const rb = new RequestBuilder(environment.JbFeedBaseURL, JbFeedService.feedPageByIdGetPath, 'get');
        if (params) rb.path('id', params.id);

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IjbFeed>)
        );
    }
   
    feedPageByIdGet(params?: { id:string }): Observable<IjbFeed> {
        return this.feedPageByIdGet$Response(params).pipe(map((r: StrictHttpResponse<IjbFeed>) => r.body as IjbFeed));
    }


    //entry by id
    feedEntryByIdGet$Response(params?: { id:string }): Observable<StrictHttpResponse<IjbFeedEntryContent>> {
        const rb = new RequestBuilder(environment.JbFeedBaseURL, JbFeedService.feedEntryByIdGetPath, 'get');
        if (params) rb.path('id', params.id);

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<IjbFeedEntryContent>)
        );
    }
   
    feedEntryByIdGet(params?: { id:string }): Observable<IjbFeedEntryContent> {
        return this.feedEntryByIdGet$Response(params).pipe(map((r: StrictHttpResponse<IjbFeedEntryContent>) => r.body as IjbFeedEntryContent));
    }

}