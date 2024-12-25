import { Component, Directive, HostBinding, input, Input, TemplateRef } from "@angular/core";
import { Observable } from "rxjs";
import { IktButtonConfig } from "../button/button.component";
import { TrustHTMLPipe } from "../../../pipes/html-sanitizer.pipe";
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface IktListItemConfig {
    title: string;
    subtitle?: string;
    description?: string;
    titleIcon?: string;
    thumbnail?: string;
    link?: string;
    styles?: any;
    iconClass?: string;
    iconStyle?: any;
    cssClass?: string;
    actions?: IktButtonConfig[];
    hideActions?: boolean;
    command?: (...args) => void;
	command$?: (...args) => Observable<any>;
}
@UntilDestroy()
@Component({
    selector: 'kt-list-item',
    standalone: true,
    imports:[CommonModule,TrustHTMLPipe],
    template: `
        <div class="kt-list-item kt-ai-center-flex" [style]="config?.styles" (click)="onclick($event)">
            <div class="_thumb">
                <img *ngIf="config?.thumbnail" [src]="config?.thumbnail"/>
                <i *ngIf="config?.iconClass" [attr.class]="config?.iconClass" [attr.style]="config?.iconStyle"></i>>
            </div>
            <div class="_icon">
            
            </div>
            <div class="_info">
                <h2 class="_title">
                    <a class="_link" [ngClass]="{'kt-no-events': !config?.link}" [href]="config?.link">{{config?.title}}</a>
                </h2>
                <h5 class="_sub">{{config?.subtitle}}</h5>
            </div>
            <div class="_descr" [innerHTML]="config?.description | trustHTML"></div>
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
