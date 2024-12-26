import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IktButtonConfig, ktButtonComponent } from "../button/button.component";

export interface IktActionsConfig{
    btns: IktButtonConfig[];
    group?: boolean;
    row?: boolean;
    column?: boolean;
}

@Component({
    selector: 'kt-actions',
    standalone: true,
    imports:[CommonModule, ktButtonComponent],
    template: `
        <div class="kt-actions kt-rel" [ngClass]="{'__group': config?.group, 'kt-row-flex': config?.row, 'kt-coloumn-flex': config?.column}">
            <span class="kt-motion-fast _action" *ngFor="let btn of config?.btns">
                <kt-button [config]="btn" (click)="btn.command()" [attr.class]="btn.hostClass"></kt-button>
            </span>
        </div>
    `
})
export class ktActionsComponent {
    @Input() config: IktActionsConfig
}




