import { AfterContentInit, AfterViewInit, Component, ContentChild, HostBinding, Input, TemplateRef } from "@angular/core";
import { IktButtonConfig, ktButtonComponent } from "../button/button.component";
import { ktTemplateDirective } from "../../../directives/template.directive";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ktLoadingComponent } from "../../containers/loader/loader.component";

export interface IktHeaderConfig {
    title: string;
    titleIcon?: string;
    subtitle?: string;
    actions?: IktButtonConfig[];
    hideActions?: boolean;
    styles?: any;
    cssClass?: string;
    intermediateClass?: string;
    headerActions:IktButtonConfig[];
    headerTpl: TemplateRef<any>
    headerActionsGroup: boolean;
    headerIconClass: string
    iconClass: string;
    iconStyle: string;
}

@Component({
    selector: 'kt-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [CommonModule, DialogModule, ktLoadingComponent, ktButtonComponent]
})
export class ktHeaderComponent implements AfterContentInit, AfterViewInit {
    static nextId = 0;
    @HostBinding() id = `kt-header-${ktHeaderComponent.nextId++}`;
    @ContentChild(ktTemplateDirective) tpl: ktTemplateDirective
    @Input() config:IktHeaderConfig;
    headerTpl: TemplateRef<any>;
    bodyTpl: TemplateRef<any>;
    actions:IktButtonConfig[];
    
    constructor() { }

    ngAfterContentInit(): void {
        const {name, template} = this.tpl;
        this.headerTpl = name === 'header' && template;
    }
    ngAfterViewInit(): void {
        this.actions = this.config?.headerActions;
    }

}


