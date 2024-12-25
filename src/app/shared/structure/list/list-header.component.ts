import { AfterContentInit, Component, Directive, Input } from "@angular/core";
import { ktButtonComponent } from "../button/button.component";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ktLoadingComponent } from "../../containers/loader/loader.component";
import { ktPanelComponent } from "../../containers/panel/panel.component";
import { IktHeaderConfig, ktHeaderComponent } from "../header/header.component";
import { ktDropdownComponent } from "../../input/dropdown/dropdown.component";
import { ktTextComponent } from "../../input/text/text.component";


export interface IktListHeaderConfig extends IktHeaderConfig{
    intermediateClass?: string;
    filterModel: any
    sortModel: any;
    sortingOpions: any;
    filterFn?: (...args) => void | Observable<any>
    sortFn?: (...args) => void
}

@Component({
    selector: 'kt-list-header',
    standalone: true,
    imports:[ktHeaderComponent, ktTextComponent, ktDropdownComponent],
    template: `
        <kt-header [config]="config">
            <ng-template ktTemplate="body">
                <kt-text
                    class="kt-header-input-text"
                    name="filterModel"
                    [iconClass]="'pi pi-search'"
                    [searchFn$]="config?.filterFn"
                ></kt-text>

                <kt-dropdown
                    class="kt-double-control-first"
                    label=""
                    name="sortModel"
                    [options]="config?.sortingOpions"
                    [optionLabel]="'label'"
                    [optionValue]="'value'"
                    [appendTo]="'body'"
                    >
                </kt-dropdown>
            </ng-template>
        <kt-header/>
    `
})
export class ktListHeaderComponent extends ktHeaderComponent implements AfterContentInit {
    @Input() config: IktListHeaderConfig;

    constructor() {
        super();
    }
    ngAfterContentInit(): void {
        super.ngAfterContentInit()
        const {name, template} = this.tpl;
        this.bodyTpl = name === 'body' && template;
    }
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.actions = this.config?.headerActions;
    }

}




