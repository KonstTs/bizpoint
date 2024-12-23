import { Injector, Type } from '@angular/core';

export type ktToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' | 'center';
export type ktSeverity = 'success' | 'info' | 'warn' | 'error';

export class ktNotificationContext<T> {
  constructor(public id: string) {}

  close: (result?: unknown) => void;
  data: T;
}
export interface ktNotificationInfo {
  contentType: Type<any>;
  id: string;
  life: number;
  sticky: boolean;
  closable: boolean;
  severity: ktSeverity;
  position: ktToastPosition;
  injector: Injector;
  data?: unknown;
}
