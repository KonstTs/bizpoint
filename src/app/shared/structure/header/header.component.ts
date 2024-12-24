import { AfterContentInit, Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { IktButtonConfig, ktButtonComponent } from "../button/button.component";
import { ktTemplateDirective } from "../../../directives/template.directive";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ktLoadingComponent } from "../../containers/loader/loader.component";
import { ktPanelComponent } from "../../containers/panel/panel.component";
import { ktHeader } from "./header-base";
import { ktListItemComponent } from "../list/list-item.component";
import { ktTextComponent } from "../../input/text/text.component";

@Component({
    selector: 'kt-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [CommonModule, DialogModule, ktLoadingComponent, ktButtonComponent, ktPanelComponent, ktTextComponent]
})
export class ktHeaderComponent extends ktHeader implements AfterContentInit { 
     @ContentChild(ktTemplateDirective) tpl:ktTemplateDirective
     @Input() subtitle?: string;
     @Input() actions?: IktButtonConfig[];
     @Input() hideActions?: boolean;
    search
     headerIconClass
     iconClass
     iconStyle
     headerTpl: TemplateRef<ktHeaderComponent>;
     headerLeftTpl: TemplateRef<ktListItemComponent>;
     headerMidTpl: TemplateRef<ktListItemComponent>;
     headerRightTpl: TemplateRef<any>;
     headerActions
     
     headerActionsGroup
     
     constructor(){
        super();
     }
     ngAfterContentInit(): void {}
}
