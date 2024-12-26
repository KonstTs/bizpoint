import { AfterContentInit, AfterViewInit, Component, ContentChild, HostBinding, Input, TemplateRef } from "@angular/core";
import { IktButtonConfig, ktButtonComponent } from "../button/button.component";
import { ktTemplateDirective } from "../../../directives/template.directive";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ktLoadingComponent } from "../../containers/loader/loader.component";
import { Observable } from "rxjs";
import { ktTextComponent } from "../../input/text/text.component";
import { ktDropdownComponent } from "../../input/dropdown/dropdown.component";
import { IktActionsConfig, ktActionsComponent } from "../actions/actions.component";

export interface IktHeaderGraphic {
    iconClass?: string;
    iconStyle?: any;
    imgSrc?: string;
    imgStyle?: any;
}

export interface IktHeaderBaseConfig {
    title?: string;
    subtitle?: string;
    styles?: any;
    cssClass?: string;
    
}

// create control generator class 
export interface IktHeaderControls {   
    filterCtrLabel?: string;
    filterCtrlModel?: any
    sortCtrLabel?: string;
    sortCtrlModel?: any;
    sortCtrlOptions?: any;
    sortCtrlOptionLabel?: string;
    sortCtrlOptionValue?: string;
    filterFn?: (...args) => void | Observable<any>
    sortFn?: (...args) => void
}

@Component({
    selector: 'kt-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        DialogModule,
        ktLoadingComponent,
        ktButtonComponent,
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
        
    constructor() { }

    ngAfterContentInit(): void { }
    ngAfterViewInit(): void { }

}


