import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${environment.psFeedAthToken})`
      }
    });
    console.log('request:', request);
    
    return next.handle(_request);
  }
}