import { Inject, Injectable } from '@angular/core';
import { ktLoggingLevel } from '../model/logs.model';
import { kt_ENVIRONMENT, ktEnvironment } from '../config/environment';

@Injectable()
export class ktLoggerService {
  private _level: ktLoggingLevel;

  constructor(@Inject(kt_ENVIRONMENT) environment: ktEnvironment) {
    this._level = environment.loggerLevel ?? ktLoggingLevel.Verbose;
  }

  logError(message: any, ...params: any[]) {
    this.log(message, ktLoggingLevel.Error, ...params);
  }

  logWarning(message: any, ...params: any[]) {
    this.log(message, ktLoggingLevel.Warning, ...params);
  }

  logInfo(message: any, ...params: any[]) {
    this.log(message, ktLoggingLevel.Info, ...params);
  }

  logVerbose(message: any, ...params: any[]) {
    this.log(message, ktLoggingLevel.Verbose, ...params);
  }

  log(message: any, level = ktLoggingLevel.Warning, ...params: any[]) {
    if (this._level !== ktLoggingLevel.None) {
      if (level >= this._level) {
        switch (level) {
          case ktLoggingLevel.Error:
            console.error(message, ...params);
            break;
          case ktLoggingLevel.Warning:
            console.warn(message, ...params);
            break;
          case ktLoggingLevel.Info:
            console.info(message, ...params);
            break;
          default:
            console.log(message, ...params);
        }
      }
    }
  }
}
