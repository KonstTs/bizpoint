import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ktLoggerService } from '../services/logger.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _loggerSvc: ktLoggerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      switchMap(r => {
        console.log('r:', r)
        return of(r)
      }),
      catchError((err: HttpErrorResponse) => {
        this._loggerSvc.logError('Interceptor error response', err);

           if(err.status === 304) { }
           if(err.status === 404) {}

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

/*
Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    NotModified = 304,
    UseProxy = 305,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    UriTooLong = 414,
    UnsupportedMediaType = 415,
    MisdirectedRequest = 421,
    Locked = 423,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NetworkAuthenticationRequired = 511
*/