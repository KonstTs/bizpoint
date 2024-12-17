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


@Injectable({
  providedIn: 'root'
})
export class BpFeedService extends BaseService {

    constructor(config: ApiConfiguration, http: HttpClient) {
      super(config, http);
    }

    static readonly feedPageGetPath = '/feed/';
    
    /**
    * "methodName$Response" methods provide access to the full `HttpResponse`, allowing access to response headers.
    * To access only the response body, use the one that follows it.
    */
    
    /*
     -H 'accept: application/json' \
  -H 'If-Modified-Since: Thu, 31 Dec 1992 11:56:00 +0200' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJHZW9yZ2VEQE9ESU4tS29uc3VsdC5ubyIsImtpZCI6IjE3MmU3OWY2LTcxZWUtNDJiNy1hZTc1LTM3OTM0M2JiZWJkZCIsImlzcyI6Im5hdi1ubyIsImF1ZCI6ImZlZWQtYXBpLXYyIiwiaWF0IjoxNzI5MjU1NjMxLCJleHAiOm51bGx9.iWVPjNV0moSrsz4G1N2KEcB24Wiji4hY_HVNEeetdTY'
    */
    
    //list
    apiFeedGet$Response(): Observable<StrictHttpResponse<Array<any>>> {
        const rb = new RequestBuilder(environment.bpFeedBaseURL, BpFeedService.feedPageGetPath, 'get');

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<Array<any>>)
        );
    }
   
    apiFeedGet(): Observable<Array<any>> {
        return this.apiFeedGet$Response().pipe(map((r: StrictHttpResponse<Array<any>>) => r.body as Array<any>));
    }

}