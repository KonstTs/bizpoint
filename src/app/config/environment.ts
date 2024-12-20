import { InjectionToken } from '@angular/core';
import { ktLoggingLevel } from './logs';

export interface ktEnvironment {
  production: boolean;
  loggerLevel: ktLoggingLevel;
}

export const kt_ENVIRONMENT = new InjectionToken<ktEnvironment>('Environment');
