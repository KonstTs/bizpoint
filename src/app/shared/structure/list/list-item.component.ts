import { Component, Directive, HostBinding, Input, TemplateRef } from "@angular/core";
import { Observable } from "rxjs";
import { IktButtonConfig } from "../button/button.component";


@Directive()
export abstract class ktBaseListItemComponent{
    static nextId = 0;
    @HostBinding() id = `kt-list-item-${ktBaseListItemComponent.nextId++}`;
    @Input() title: string;
    @Input() subtitle: string;
    @Input() clckFn: (...args) => any | void;
    @Input() clckFn$: (...args) => Observable<any>;
    @Input() swipeFn: (...args) => any | void;
    @Input() swipeFn$: (...args) => Observable<any>;
}


@Directive({
    selector: 'kt-list-item',
    standalone: true
})
export class ktListItemComponent extends ktBaseListItemComponent{
    @Input() titleIcon: string;
    @Input() thumbnail: string;
    @Input() description: string;
    @Input() styles: any;
    @Input() cssClass: string;
    @Input() actions: IktButtonConfig[];
    @Input() hideActions: boolean;
    headerTpl: TemplateRef<any>;
    bodyTpl: TemplateRef<any>;
    footerTpl: TemplateRef<any>;
}

