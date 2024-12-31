import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

export interface IktIconListDetailConfig{
    group?: boolean;
    row?: boolean;
    column?: boolean;
    details?: Array<{iconClass?: string; iconStyle?: {[klass: string]: any}; value?: string; valueStyle:{[klass: string]:any}}>
}

@Component({
    selector: 'kt-icon-list',
    standalone: true,
    imports:[CommonModule],
    template: `
        <div class="kt-iconlist kt-rel" [ngClass]="{'__group': config?.group, 'kt-row-flex': config?.row, 'kt-coloumn-flex': config?.column}">
            <h5 class="kt-motion-fast _detail kt-trim kt-mrgr30 kt-ai-stretch-flex"  *ngFor="let detail of config?.details">
                <i class="pi kt-mrgr5" [ngClass]="detail.iconClass" [ngStyle]="detail.iconStyle"></i>
                <span class="kt-txt-color-gr kt-font-600" [ngStyle]="detail.valueStyle">
                    {{detail?.value}}
                </span>
            </h5>
        </div>
    `
})
export class ktIconListComponent {
    @Input() config: IktIconListDetailConfig
}




