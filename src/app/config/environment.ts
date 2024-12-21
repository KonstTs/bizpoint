import { InjectionToken } from '@angular/core';
import { ktLoggingLevel } from '../model/logs.model';

export interface ktEnvironment {
  production: boolean;
  loggerLevel: ktLoggingLevel;
}

export const kt_ENVIRONMENT = new InjectionToken<ktEnvironment>('Environment');
