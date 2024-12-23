import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Subject } from 'rxjs';
import { IktConfirmationInfo } from '../../../model/confirm.model';
import { ktButtonComponent } from "../../structure/button/button.component";


@Component({
    standalone: true,
    imports: [CommonModule, ConfirmDialogModule, ktButtonComponent],
    template: `
    <p-confirmDialog #dlg [style]="style" [baseZIndex]="10000">
        <ng-template pTemplate="header">
            <h3 class="p-mb-0">{{ label }}</h3>
        </ng-template>
        <ng-template pTemplate="footer">
            <kt-button [icon]="okIcon" [label]="okLabel" (click)="dlg.accept()"></kt-button>
            <kt-button severity="secondary" [icon]="cancelIcon" [label]="cancelLabel" (click)="dlg.reject()"></kt-button>
        </ng-template>
    </p-confirmDialog>
  `
})
export class ktConfirmDialogComponent implements AfterViewInit, OnDestroy {
    style = { 'white-space': 'pre-line', 'max-width': '50vw' };
    label: string;
    okIcon: string;
    cancelIcon: string;
    okLabel: string;
    cancelLabel: string;


    constructor(private _confirmationSvc: ConfirmationService) { }


    showQuestion(msg: IktConfirmationInfo, result$: Subject<boolean>): void {
        this.label = msg.header;
        this.okLabel = msg.acceptLabel;
        this.okIcon = msg.acceptIcon;
        this.cancelLabel = msg.rejectLabel;
        this.cancelIcon = msg.rejectIcon;


        setTimeout(() => {
            this._confirmationSvc.confirm({
                icon: msg.icon,
                message: msg.message,
                accept: () => {
                    result$.next(true);
                    result$.complete();
                },
                reject: () => {
                    result$.next(false);
                    result$.complete();
                }
            });
        });
    }


    ngAfterViewInit() { }


    ngOnDestroy() { }
}
