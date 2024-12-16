import { Inject, Injectable } from '@angular/core';
import { BpLoggingLevel } from '../config/logs';
import { BP_ENVIRONMENT, BpEnvironment } from '../config/environment';

@Injectable()
export class BpLoggerService {
  private _level: BpLoggingLevel;

  constructor(@Inject(BP_ENVIRONMENT) environment: BpEnvironment) {
    this._level = environment.loggerLevel ?? BpLoggingLevel.Verbose;
  }

  logError(message: any, ...params: any[]) {
    this.log(message, BpLoggingLevel.Error, ...params);
  }

  logWarning(message: any, ...params: any[]) {
    this.log(message, BpLoggingLevel.Warning, ...params);
  }

  logInfo(message: any, ...params: any[]) {
    this.log(message, BpLoggingLevel.Info, ...params);
  }

  logVerbose(message: any, ...params: any[]) {
    this.log(message, BpLoggingLevel.Verbose, ...params);
  }

  log(message: any, level = BpLoggingLevel.Warning, ...params: any[]) {
    if (this._level !== BpLoggingLevel.None) {
      if (level >= this._level) {
        switch (level) {
          case BpLoggingLevel.Error:
            console.error(message, ...params);
            break;
          case BpLoggingLevel.Warning:
            console.warn(message, ...params);
            break;
          case BpLoggingLevel.Info:
            console.info(message, ...params);
            break;
          default:
            console.log(message, ...params);
        }
      }
    }
  }
}
