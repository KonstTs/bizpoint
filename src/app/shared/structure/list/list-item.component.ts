import { Component, Directive, HostBinding, input, Input, TemplateRef } from "@angular/core";
import { Observable } from "rxjs";
import { IktActionsConfig, ktActionsComponent } from "../actions/actions.component";
import { TrustHTMLPipe } from "../../../pipes/html-sanitizer.pipe";
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ktButtonComponent } from "../button/button.component";
import { IktIconListDetailConfig, ktIconListComponent } from "../details/icon-list-details";

export interface IktListItemConfig {
    title: string;
    subtitle?: string;
    details?: any;
    location?: string;
    salary?: string;
    employer?: string;
    description?: string;
    titleIcon?: string;
    img?: string;
    link?: string;
    styles?: any;
    iconClass?: string;
    iconStyle?: any;
    cssClass?: string;
    actions?: IktActionsConfig;
    hideActions?: boolean;
    command?: (...args) => void;
	command$?: (...args) => Observable<any>;
}
@UntilDestroy()
@Component({
    selector: 'kt-list-item',
    standalone: true,
    imports: [CommonModule, TrustHTMLPipe, ktActionsComponent],
    template: `
        <div class="kt-list-item kt-ai-center-flex" [style]="config?.styles" (click)="onclick($event)">
            <div class="_thumb kt-pic">
                <div *ngIf="config?.img" class="kt-bg-img-auto-fit kt-height" [style.background-image]="'url(&quot;' + config?.img + '&quot;)'"></div>
                <i *ngIf="config?.iconClass" [attr.class]="config?.iconClass" [attr.style]="config?.iconStyle"></i>
            </div>
            <div class="_info kt-trim">
                <!-- title -->
                <h2 class="_title">
                    <a class="_link kt-trim" [ngClass]="{'kt-no-events': !config?.link}" [href]="config?.link">{{config?.title}}</a>
                </h2>
                <!-- subtitle -->
                <h5 *ngIf="config?.subtitle" class="_subtitle">{{config?.subtitle}}</h5>
                <!-- list of icons for details -->
                <div *ngIf="config?.details" class="_details-icon-list kt-flex kt-trim kt-mrgt10" [innerHTML]="config?.details | trustHTML">
                </div>
            </div>
            <div class="_actions kt-ai-center-flex kt-jc-flex-end">
                <div *ngIf="config?.actions">
                    <kt-actions [config]="config?.actions"></kt-actions>
                </div>
            </div>
        </div>
    `
})
export class ktListItemComponent{
    static nextId = 0;
    @HostBinding() id = `kt-list-item-${ktListItemComponent.nextId++}`;
    @Input() config:IktListItemConfig;
    onclick(e){
        if(this.config?.command) this.config.command(e);
        if(this.config?.command$) this.config.command$(e).pipe(untilDestroyed(this)).subscribe();
    }
    
}
