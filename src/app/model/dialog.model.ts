import { Injector, Type, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';


export class ktDialogContext<T> {
  close: (result?: unknown) => void;
  data: T;
}


export interface ktDialogConfig {
  componentType: Type<any>;
  // componentType: any;
  data?: unknown;
  injector: Injector;
  vcr?: ViewContainerRef
}