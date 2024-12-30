import { Component, Directive, HostBinding, input, Input, TemplateRef } from "@angular/core";
import { Observable } from "rxjs";
import { IktActionsConfig, ktActionsComponent } from "../actions/actions.component";
import { TrustHTMLPipe } from "../../../pipes/html-sanitizer.pipe";
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ktButtonComponent } from "../button/button.component";

export interface IktListItemConfig {
    title: string;
    subtitle?: string;
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
    imports: [CommonModule, TrustHTMLPipe, ktButtonComponent, ktActionsComponent],
    template: `
        <div class="kt-list-item kt-ai-center-flex" [style]="config?.styles" (click)="onclick($event)">

            <div class="_thumb kt-pic">
                <div *ngIf="config?.img" class="kt-bg-img-auto-fit kt-height" [style.background-image]="'url(&quot;' + config?.img + '&quot;)'"></div>
                <i *ngIf="config?.iconClass" [attr.class]="config?.iconClass" [attr.style]="config?.iconStyle"></i>
            </div>

            <div class="_info">
                <h2 class="_title kt-trim">
                    <a class="_link" [ngClass]="{'kt-no-events': !config?.link}" [href]="config?.link">{{config?.title}}</a>
                </h2>
                <div class="kt-flex kt-trim kt-mrgt10">
                    <h5 class="_sub kt-trim kt-mrgr30 kt-ai-stretch-flex">
                        <i class="pi pi-map-marker kt-mrgr5" style="color: #F39C19;"></i>
                        <span class="kt-txt-color-gr kt-font-600" style="background: linear-gradient(135deg, #F39C19, #C0382B);">
                            {{config?.location}}
                        </span>
                    </h5>
                    <h5 class="_sub kt-trim kt-mrgr30 kt-ai-stretch-flex">
                        <i class="pi pi-money-bill kt-mrgr5" style="color: #42d392;"></i>
                        <span class="kt-txt-color-gr kt-font-600" style="background: linear-gradient(135deg, #42d392,rgb(2, 99, 34));">
                            {{config?.salary}}
                        </span>
                    </h5>
                    <h5 class="_sub kt-trim kt-mrgr30 kt-ai-stretch-flex ">
                        <i class="pi pi-building-columns kt-mrgr5" style="color: rgb(248, 41, 172);"></i>
                        <span class="kt-txt-color-gr kt-font-600" style="background: linear-gradient(135deg,rgb(248, 41, 172),rgb(82, 10, 141));">
                            {{config?.employer}}
                        </span>
                        <i class="pi pi-star-fill kt-txt-color-light-grey kt-mrgl10"></i>
                    </h5>
                </div>
                
            </div>

            <div *ngIf="config?.actions">
                <kt-actions [config]="config?.actions"></kt-actions>
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
