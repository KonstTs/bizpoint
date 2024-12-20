import { Directive, HostBinding, Input, TemplateRef } from "@angular/core";
import { Observable } from "rxjs";
import { ktButtonConfig } from "../button/button.component";


@Directive()
export abstract class ktBaseListItemComponent{
    static nextId = 0;
    @HostBinding() id = `kt-list-item-${ktBaseListItemComponent.nextId++}`;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() clckFn: (...args) => any | void;
    @Input() clckFn$: (...args) => Observable<any>;
    @Input() swipeFn: (...args) => any | void;
    @Input() swipeFn$: (...args) => Observable<any>;
}


@Directive()
export abstract class ktListItemComponent extends ktBaseListItemComponent{
    @Input() titleIcon?: string;
    @Input() thumbnail?: string;
    @Input() description?: string;
    @Input() styles?: any;
    @Input() cssClass?: string;
    @Input() actions: ktButtonConfig[];
    @Input() hideActions: boolean;
    @Input() headerTpl?: TemplateRef<unknown>;
    @Input() bodyTpl?: TemplateRef<unknown>;
    @Input() footerTpl?: TemplateRef<unknown>;
}

