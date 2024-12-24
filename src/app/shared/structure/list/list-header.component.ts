import { AfterContentInit, Component, Directive, Input } from "@angular/core";
import { ktButtonComponent } from "../button/button.component";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ktLoadingComponent } from "../../containers/loader/loader.component";
import { ktPanelComponent } from "../../containers/panel/panel.component";
import { ktHeaderComponent } from "../header/header.component";

@Component({
    selector: 'kt-list-header',
    standalone: true,
    template: ''
})
export class ktListHeaderComponent extends ktHeaderComponent implements AfterContentInit {
    @Input() sorting?: boolean;
    @Input() filtering?: boolean;
    @Input() searching?: boolean;

    @Input() filterFn: (...args) => void;
    @Input() searchFn$ = (...args) => Observable<any>;

    constructor() {
        super();
    }
    ngAfterContentInit(): void { }

}




