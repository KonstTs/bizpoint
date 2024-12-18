import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BpLoggerService } from '../services/logger.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _loggerSvc: BpLoggerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this._loggerSvc.logError('Interceptor error response', err);

           if ([304].find((p) => p === err.status)) { }
           else if ([404].find((p) => p === err.status)) {}

        return of(null);
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // this._loggerSvc.logInfo('Interceptor response', event);
        }
        return event;
      })
    );
  }
}
