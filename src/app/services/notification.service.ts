import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Component, ComponentRef, Inject, Injectable, Injector, NgModuleRef, OnDestroy, Optional, ViewContainerRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { IktConfirmationInfo } from '../model/confirm.model';
import { IktDialogConfig, ktDialogContext } from '../model/dialog.model';
import { ktSeverity, IktNotificationInfo, ktNotificationContext } from '../model/toast.model';
import { ktConfirmDialogComponent } from '../shared/containers/confirm-dialog/confirm-dialog.component';
import { ktToastDefaultContentComponent } from '../shared/containers/toast/toast-default.component';
import { ktToastHostComponent } from '../shared/containers/toast/toast-host.component';
import { ktToastMultipleContentComponent } from '../shared/containers/toast/toast-multiple.component';
import { ktToastComponent } from '../shared/containers/toast/toast.component';
import { ktDialogComponent } from '../shared/containers/dialog/dialog.component';


@UntilDestroy()
@Injectable(
  {
    providedIn: "root"
  }
)

export class ktNotificationService implements OnDestroy {
  protected activeDialog: ktDialogComponent;
  protected toastHostCompRef: ComponentRef<ktToastHostComponent>;
  protected toastCompRefsMap: Map<string, { close$: Subject<unknown>; compRef: ComponentRef<ktToastComponent> }> = new Map();
  protected vcr: ViewContainerRef;

  constructor(
    protected injector: Injector,
    protected appRef: ApplicationRef,
    @Inject(DOCUMENT) protected document: Document
  ) {
    this.vcr = (this.appRef.components[0].instance as AppComponent).appVCR;
  }

  showDialog(args: IktDialogConfig): void;
  showDialog<TRes>(args: IktDialogConfig): Observable<TRes>;
  showDialog(args: IktDialogConfig): Observable<unknown> {
    const close$ = new Subject<unknown>();
    const ngModuleRef = args.injector.get(NgModuleRef) as any;
    const dialogCtx = new ktDialogContext();
   
    dialogCtx.data = args.data;
    dialogCtx.close = (result: unknown): void => {
      close$.next(result);
      close$.complete();
    };

    let dialogInjector = Injector.create({
      providers: [{ provide: ktDialogContext, useValue: dialogCtx }],
      parent: args.injector
    });

    const dialogCompRef = this.vcr.createComponent(args.componentType, {injector: dialogInjector, ngModuleRef: ngModuleRef} );
    this.document.body.appendChild(dialogCompRef.location.nativeElement);

    close$.pipe(take(1)).subscribe(() => {
      dialogCompRef.destroy();
    });

    return close$.asObservable();
  }


  setActiveDialog(dialog: ktDialogComponent): void {
    this.activeDialog = dialog;
  }


  getActiveDialog(): ktDialogComponent {
    return this.activeDialog;
  }

  showSuccess(title: string, body: string): void;
  showSuccess(title: string, body: string, life?: number): void;
  showSuccess(title: string, body: string, life?: number, closable?: boolean): void;
  showSuccess(title: string, body: string, life?: number, closable?: boolean, sticky?: boolean): void;
  showSuccess(title: string, body: string, life?: number, closable?: boolean, sticky?: boolean): void {
    this.showMessageComponent({
      contentType: ktToastDefaultContentComponent,
      data: { summary: title, detail: body, severity: 'success' },
      position: 'top-right',
      life: life ?? 4000,
      severity: 'success',
      closable: closable ?? true,
      sticky: sticky ?? false,
      injector: this.injector,
      id: 'root'
    });
  }

  showWarning(title: string, body: string): void;
  showWarning(title: string, body: string, life?: number): void;
  showWarning(title: string, body: string, life?: number, closable?: boolean): void;
  showWarning(title: string, body: string, life?: number, closable?: boolean, sticky?: boolean): void;
  showWarning(title: string, body: string, life?: number, closable?: boolean, sticky?: boolean): void {
    this.showMessageComponent({
      contentType: ktToastDefaultContentComponent,
      data: { summary: title, detail: body, severity: 'warn' },
      position: 'top-right',
      life: life ?? 6000,
      severity: 'warn',
      closable: closable ?? true,
      sticky: sticky ?? false,
      injector: this.injector,
      id: 'root'
    });
  }

  showError(title: string, body: string): void;
  showError(title: string, body: string, life?: number): void;
  showError(title: string, body: string, life?: number, closable?: boolean): void;
  showError(title: string, body: string, life?: number, closable?: boolean, sticky?: boolean): void;
  showError(title: string, body: string, life?: number, closable?: boolean, sticky?: boolean): void {
    this.showMessageComponent({
      contentType: ktToastDefaultContentComponent,
      data: { summary: title, detail: body, severity: 'error' },
      position: 'top-right',
      life: life ?? 8000,
      severity: 'error',
      closable: closable ?? true,
      sticky: sticky ?? false,
      injector: this.injector,
      id: 'root'
    });
  }

  showQuestion(title: string, message: string): Observable<boolean>;
  showQuestion(title: string, message: string, okLabel?: string, cancelLabel?: string): Observable<boolean>;
  showQuestion(title: string, message: string, okLabel?: string, cancelLabel?: string): Observable<boolean> {
    return this.showConfirmComponent({
      contentType: ktConfirmDialogComponent,
      header: title,
      message: message,
      acceptLabel: okLabel ?? 'OK',
      rejectLabel: cancelLabel ?? 'CANCEL',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      position: 'center',
      injector: this.injector
    });
  }

  showMultiple(title: string, messages: { body: string; severity: ktSeverity }[]): void;
  showMultiple(title: string, messages: { body: string; severity: ktSeverity }[], life?: number): void;
  showMultiple(title: string, messages: { body: string; severity: ktSeverity }[], life?: number, closable?: boolean): void;
  showMultiple(title: string, messages: { body: string; severity: ktSeverity }[], life?: number, closable?: boolean, sticky?: boolean): void;
  showMultiple(title: string, messages: { body: string; severity: ktSeverity }[], life?: number, closable?: boolean, sticky?: boolean): void {
    this.showMessageComponent({
      contentType: ktToastMultipleContentComponent,
      data: { title, messages: messages },
      position: 'top-right',
      life: life ?? 8000,
      severity: 'info',
      closable: closable ?? true,
      sticky: sticky ?? false,
      injector: this.injector,
      id: 'rootmulti'
    });
  }

  showMessageComponent(args: IktNotificationInfo): void | Observable<unknown> {
    /* Create a toasts host component only once */
    if (!this.toastHostCompRef) {
      this.toastHostCompRef = this.vcr.createComponent(ktToastHostComponent, {injector: this.injector} );
      // this.appRef.attachView(this.toastHostCompRef.hostView);
      this.document.body.appendChild(this.toastHostCompRef.location.nativeElement);
    }

    /* Create a new or get cached toast component */
    let toastCompInfo = this.toastCompRefsMap.get(args.id);
    if (!toastCompInfo) {
      const compRef = this.toastHostCompRef.instance.vcr.createComponent(ktToastComponent, {injector: this.injector} );

      toastCompInfo = {
        compRef: compRef,
        close$: new Subject<unknown>()
      };

      toastCompInfo.compRef.instance.setClose((res?: unknown) => {
        toastCompInfo.close$.next(res);
      });

      this.toastCompRefsMap.set(args.id, toastCompInfo);
    }

    /* Setup plumbing for closing from inside the created toast item component */
    const self = this;
    const ctx = new ktNotificationContext(args.id);
    ctx.data = args.data;
    ctx.close = (res?: unknown) => {
      let toastCompInfo = self.toastCompRefsMap.get(this['id']);
      toastCompInfo.compRef.instance.close(res);
    };

    // /* Provide toast context */
    const parentInjector = args.injector;
    let injector = Injector.create({
      providers: [{ provide: ktNotificationContext, useValue: ctx }],
      parent: parentInjector
    });
    args.injector = injector;

    /* Show toast */
    toastCompInfo.compRef.instance.showMessage(args);
    /* Return close event */
    return toastCompInfo.close$.asObservable();
  }


  showConfirmComponent(args: IktConfirmationInfo): Observable<boolean> {
    return new Observable((observer) => {
      const confirmDialogRef = this.vcr.createComponent(ktConfirmDialogComponent, {injector: args.injector} );

      this.appRef.attachView(confirmDialogRef.hostView);
      this.document.body.appendChild(confirmDialogRef.location.nativeElement);

      const result$ = new Subject<boolean>();
      confirmDialogRef.instance.showQuestion(args, result$);

      result$.pipe(take(1)).subscribe((result) => {
        confirmDialogRef.destroy();
        this.appRef.detachView(confirmDialogRef.hostView);
        observer.next(result);
        observer.complete();
      });
    });
  }


  ngOnDestroy() {}
}









