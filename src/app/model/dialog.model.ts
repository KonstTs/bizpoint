import { Injector, Type, ViewContainerRef } from '@angular/core';


export class ktDialogContext<T> {
  close: (result?: unknown) => void;
  data: T;
}


export interface IktDialogConfig {
  componentType: Type<any>;
  // componentType: any;
  data?: unknown;
  injector: Injector;
  vcr?: ViewContainerRef
}