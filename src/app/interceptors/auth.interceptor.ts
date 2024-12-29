import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url} = request;
    const auth = url.includes('pexels') ? 'pexelsAPIKEY' : 'psFeedAthToken';
    const _request = request.clone({
      setHeaders: {
        'Authorization': environment[auth]
      }
    });
    
    return next.handle(_request)
  }
}