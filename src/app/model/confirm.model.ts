import { InjectionToken, Injector, Type } from '@angular/core';
import { ktToastPosition } from './toast.model';


export const CONFIRM_CONTEXT = new InjectionToken<any>('CONFIRM_CONTEXT');


export interface ktConfirmationInfo {
  contentType: Type<any>;
  acceptLabel: string;
  rejectLabel: string;
  header: string;
  message: string;
  acceptIcon: string;
  rejectIcon: string;
  icon: string;
  position: ktToastPosition;
  injector: Injector;
}





