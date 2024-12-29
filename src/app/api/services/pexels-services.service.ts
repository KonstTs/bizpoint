/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ktPexelsService extends BaseService {

    constructor(config: ApiConfiguration, http: HttpClient) {
      super(config, http);
    }

    static pexelsPhotosGetPath = '/v1/search?query=company&per_page=80';
    /**
    * "methodName$Response" methods provide access to the full `HttpResponse`, allowing access to response headers.
    * To access only the response body, use the one that follows it.
    */
    
    pexelsPhotosGet$Response(): Observable<StrictHttpResponse<any>> {
        const rb = new RequestBuilder('pexels', ktPexelsService.pexelsPhotosGetPath, 'get');

        return this.http.request(rb.build({responseType: 'json', accept: 'application/json'})).pipe(
            filter((r: any) => r instanceof HttpResponse), 
            map((r: HttpResponse<any>) => r as StrictHttpResponse<any>),
        );
    }
   
    pexelsPhotosGet(): Observable<any> {
        return this.pexelsPhotosGet$Response().pipe(map((r: StrictHttpResponse<any>) => r.body as any));
    }
}