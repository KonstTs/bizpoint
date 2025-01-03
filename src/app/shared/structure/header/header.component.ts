import { AfterContentInit, AfterViewInit, Component, ContentChild, Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, TemplateRef } from "@angular/core";
import { IktButtonConfig, ktButtonComponent } from "../button/button.component";
import { ktTemplateDirective } from "../../../directives/template.directive";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ktLoadingComponent } from "../../containers/loader/loader.component";
import { Observable } from "rxjs";
import { ktTextComponent } from "../../input/text/text.component";
import { ktDropdownComponent } from "../../input/dropdown/dropdown.component";
import { IktActionsConfig, ktActionsComponent } from "../actions/actions.component";
import { ktDialogContext } from "../../../model/dialog.model";
import { ktNotificationService } from "../../../services/notification.service";
import { ktSelectComponent } from "../../input/select/select.component";

export class ktHdrContext<T> {
    data: T;
  }
export interface IktHeaderBaseConfig {
    title?: string;
    subtitle?: string;
    styles?: any;
    cssClass?: string;
}

export interface IktHeaderGraphic {
    iconClass?: string;
    iconStyle?: any;
    imgSrc?: string;
    imgStyle?: any;
}



@Directive()
export abstract class ktBaseHeader implements OnInit, AfterViewInit, OnDestroy { 
     static nextId = 0;
     @HostBinding() id = `kt-header-${ktBaseHeader.nextId++}`;
     @Input() title?: string;
     ngOnInit(): void {}
     ngAfterViewInit(): void {}
     ngOnDestroy(): void {}
}


@Directive()
export abstract class ktHeader extends ktBaseHeader implements OnInit, AfterViewInit, OnDestroy{
     @Input() titleIcon?: string;
     @Input() subtitle?: string;
     @Input() styles?: any;
     @Input() cssClass?: string;
     @Input() tpl?: TemplateRef<unknown>;

     constructor() { super() }

     ngOnInit(): void {super.ngOnInit()}
     ngAfterViewInit(): void {super.ngAfterViewInit()}
     ngOnDestroy(): void {super.ngOnDestroy()}
    
};

@Directive()
export abstract class ktSectionHeader extends ktHeader implements OnInit, AfterViewInit, OnDestroy{     
     @Input() actions?: IktButtonConfig[];
     @Input() hideActions?: boolean;
     @Input() loading: boolean;
     constructor() { super() }

     ngOnInit(): void {super.ngOnInit()}
     ngAfterViewInit(): void {super.ngAfterViewInit()}
     ngOnDestroy(): void {super.ngOnDestroy()}
};


export type ktHeaderControls = ktTextComponent | ktSelectComponent ;

@Directive()
export abstract class ktTableHeader extends ktSectionHeader implements OnInit, AfterViewInit, OnDestroy{     
     @Input() sorting?: boolean;
     @Input() filtering?: boolean;
     @Input() searching?: boolean;
     
     @Input() inputControls: ktHeaderControls[];
     @Input() filterFn: (...args) => void;
     @Input() searchFn$ = (e) => Observable<any>;
     constructor() { super() }

     ngOnInit(): void {super.ngOnInit()}
     ngAfterViewInit(): void {super.ngAfterViewInit()}
     ngOnDestroy(): void {super.ngOnDestroy()}
}



// create control generator class 
export interface IktHeaderControls {   
    filterCtrLabel?: string;
    filterCtrlModel?: any
    sortCtrLabel?: string;
    sortCtrktodel?: any;
    sortCtrlOptions?: any;
    sortCtrlOptionLabel?: string;
    sortCtrlOptionValue?: string;
    filterFn?: (...args) => Observable<any> | void;
    sortFn?: (...args) => void;
    searchFn?: (...args) => Observable<any>;
}

@Component({
    selector: 'kt-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        DialogModule,
        ktTextComponent,
        ktDropdownComponent,
        ktActionsComponent
    ]
})
export class ktHeaderComponent implements AfterContentInit, AfterViewInit {
    static nextId = 0;
    @HostBinding() id = `kt-header-${ktHeaderComponent.nextId++}`;
    @ContentChild(ktTemplateDirective) tpl: ktTemplateDirective
    headerTpl: TemplateRef<any>;
    
    @Input() config: IktHeaderBaseConfig;
    @Input() graphic: IktHeaderGraphic;
    @Input() actions: IktActionsConfig;
    @Input() controls: IktHeaderControls;
    constructor() { 
;
    }

    ngAfterContentInit(): void {
        
     }
    ngAfterViewInit(): void { 
    }

}


