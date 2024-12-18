import { Inject, Injectable } from '@angular/core';
import { JbLoggingLevel } from '../config/logs';
import { Jb_ENVIRONMENT, JbEnvironment } from '../config/environment';

@Injectable()
export class JbLoggerService {
  private _level: JbLoggingLevel;

  constructor(@Inject(Jb_ENVIRONMENT) environment: JbEnvironment) {
    this._level = environment.loggerLevel ?? JbLoggingLevel.Verbose;
  }

  logError(message: any, ...params: any[]) {
    this.log(message, JbLoggingLevel.Error, ...params);
  }

  logWarning(message: any, ...params: any[]) {
    this.log(message, JbLoggingLevel.Warning, ...params);
  }

  logInfo(message: any, ...params: any[]) {
    this.log(message, JbLoggingLevel.Info, ...params);
  }

  logVerbose(message: any, ...params: any[]) {
    this.log(message, JbLoggingLevel.Verbose, ...params);
  }

  log(message: any, level = JbLoggingLevel.Warning, ...params: any[]) {
    if (this._level !== JbLoggingLevel.None) {
      if (level >= this._level) {
        switch (level) {
          case JbLoggingLevel.Error:
            console.error(message, ...params);
            break;
          case JbLoggingLevel.Warning:
            console.warn(message, ...params);
            break;
          case JbLoggingLevel.Info:
            console.info(message, ...params);
            break;
          default:
            console.log(message, ...params);
        }
      }
    }
  }
}
