import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { METADATA_PROP_NAME } from '../config/response-wrapper-metadata';
import { ktApiResponse } from '../model/api-response.model';
import { isApiResponse } from '../config/utils';

@Injectable()
export class ktApiResponseWrapperInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) event = event.clone({ body: this.modifyBody(event.body) });
        return event;
      })
    );
  }

  private modifyBody(body: any) {
    if (!!body && typeof body !== 'string' && isApiResponse(body)) {
      this.addMetadata(body);
      return body.data;
    } 
    return body;
  }

  private addMetadata(body: ktApiResponse): void {
    if (typeof body.data === 'string' || typeof body.data === 'number') return;
    if (!body.data) body.data = {};
    
    Reflect.defineProperty(body.data, METADATA_PROP_NAME, {
      configurable: false,
      enumerable: false,
      value: {
        isError: body.isError,
        messages: body.messages,
        metadata: body.metadata
      }
    });
  }
}
