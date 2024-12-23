import { Directive, HostBinding, Input } from "@angular/core";
import { IktButtonConfig } from "../button/button.component";

@Directive()
export abstract class ktHeader {
    static nextId = 0;
    @HostBinding() id = `kt-header-${ktHeader.nextId++}`;
    constructor() { }
    @Input() title?: string;
    @Input() titleIcon?: string;
    @Input() styles?: any;
    @Input() cssClass?: string;
}
