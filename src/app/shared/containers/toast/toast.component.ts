import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IktNotificationInfo, ktToastPosition } from '../../../model/toast.model';

@Component({
    standalone: true,
    imports: [CommonModule, ToastModule],
    providers: [MessageService],
    template: `
    <p-toast class="p-toast kt-shadow kt-toast-z-index" #toast [style]="style" [styleClass]="styleClass" [position]="position" [key]="id" (onClose)="closeFn()">
      <ng-template pTemplate="message" let-msg>
        <ng-container *ngComponentOutlet="toastContent; injector: msg.data"></ng-container>
      </ng-template>
    </p-toast>
  `,
    styles: [`
    :host ::ng-deep .p-toast-icon-close{position: absolute;left: auto; right: 10px; bottom: auto; top: 3px;color: #999;}
  `]
})
export class ktToastComponent {
    style: any = { 'white-space': 'pre-line', width: '360px', 'margin-top': ' 70px' };
    styleClass: string;
    position: ktToastPosition;
    id: string;
    toastContent: Type<unknown>;
    closeFn: (res?: unknown) => void;


    constructor(private _messageSvc: MessageService) {
    }

    showMessage(msg: IktNotificationInfo): void {
        this.id = msg.id;
        this.position = msg.position;
        this.toastContent = msg.contentType;

        setTimeout(() => {
            this._messageSvc.add({
                key: msg.id,
                life: msg.life,
                closable: msg.closable,
                sticky: msg.sticky,
                severity: msg.severity,
                data: msg.injector
            });
        });
    }

    close(res?: unknown): void {
        this._messageSvc.clear(this.id);
        this.closeFn(res);
    }

    setClose(close: (res?: unknown) => void): void {
        this.closeFn = close;
    }
}

