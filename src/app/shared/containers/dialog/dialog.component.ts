import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, Input, NgModule, OnDestroy, OnInit, Optional, QueryList, TemplateRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ktDialogContext } from '../../../model/dialog.model';
import { ktTemplateDirective } from '../../../directives/template.directive';
import { ktNotificationService } from '../../../services/notification.service';
import { IktButtonConfig, ktButtonComponent } from '../../structure/button/button.component';
import { ktLoadingComponent } from '../loader/loader.component';
import { ktPanelComponent } from '../panel/panel.component';


@Component({
    selector: 'kt-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    standalone: true,
    imports: [CommonModule, DialogModule, ktLoadingComponent, ktButtonComponent, ktPanelComponent]
})
export class ktDialogComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    @Input() visible = true;
    @Input() label: string;
    @Input() position:any = 'center';
    @Input() keepInViewport = true;
    @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    @Input() closable = true;
    @Input() dismissableMask = false;
    @Input() maskStyleClass: string;
    @Input() modal = false;
    @Input() loading = false;
    @Input() style = { width: '65vw', height: 'auto', 'max-height': '85vh', display: 'flex', 'flex-direction': 'column' };
    @Input() contentOverflowVisible = false;
    @Input() headerIconClass: string
    @Input() headerActions: IktButtonConfig[];
    @Input() headerActionsGroup: boolean;
    
    headerTpl: TemplateRef<unknown>;
    bodyTpl: TemplateRef<unknown>;
    footerTpl: TemplateRef<unknown>;

    @ContentChildren(ktTemplateDirective) templates: QueryList<ktTemplateDirective>;

    constructor(@Optional() public ctx: ktDialogContext<unknown>, public _elRef: ElementRef, protected notificationSvc: ktNotificationService) {
        notificationSvc.setActiveDialog(this);
    }

    ngOnInit(): void { }

    ngAfterContentInit(): void {
        this.templates.forEach((tpl) => {
            switch (tpl.name) {
                case 'header': this.headerTpl = tpl.template;
                    break;
                case 'body': this.bodyTpl = tpl.template;
                    break;
                case 'footer': this.footerTpl = tpl.template;
                    break;
                default:
                    throw new Error(`Unsupported template type ${tpl.name}`);
            }
        });
    }

    ngAfterViewInit(): void {
        this.setHeight();
    }

    ngOnDestroy(): void {
        this.notificationSvc.setActiveDialog(null);
    }

    setHeight() {
        if (this.style.height !== 'auto') return;
        const elRef = this._elRef.nativeElement;
        if (!elRef) return;
        const headerHeight = elRef.getElementsByClassName('p-dialog-header')?.item(0)?.scrollHeight;
        const bodyHeight = elRef.getElementsByClassName('p-dialog-content')?.item(0)?.scrollHeight;
        const footerHeight = elRef.getElementsByClassName('p-dialog-footer')?.item(0)?.scrollHeight;
        const totalHeight = headerHeight + bodyHeight + footerHeight;
        this.style = { ...this.style, height: `${totalHeight}px` } as any;
    }

    close(result?: unknown): void {
        this.visible = false;
        this.ctx?.close(result);
    }
}
