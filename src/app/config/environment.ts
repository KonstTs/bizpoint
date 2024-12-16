import { InjectionToken } from '@angular/core';
import { BpLoggingLevel } from './logs';

export interface BpEnvironment {
  production: boolean;
  loggerLevel: BpLoggingLevel;
}

export const BP_ENVIRONMENT = new InjectionToken<BpEnvironment>('Environment');
