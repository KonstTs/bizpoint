import { InjectionToken } from '@angular/core';
import { JbLoggingLevel } from './logs';

export interface JbEnvironment {
  production: boolean;
  loggerLevel: JbLoggingLevel;
}

export const Jb_ENVIRONMENT = new InjectionToken<JbEnvironment>('Environment');
