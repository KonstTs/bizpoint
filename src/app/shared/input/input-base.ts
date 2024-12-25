import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, HostBinding, InjectFlags, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NgModel, Validator } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ktLoggerService } from '../../services/logger.service';
import { ktNotificationService } from '../../services/notification.service';
import { ktModelProxyService } from '../../services/model-proxy/model-proxy.service';


@UntilDestroy()
@Directive()
export abstract class ktInputBase implements OnInit, AfterContentInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() label: string;
  @Input() hint: string;
  @Input() name: string;
  @Input() description: string;
  @Input() isGridEditor = false;
  @Input() requiredError = 'No value provided!';
  @Input() required = false;
  @Input() inputAsLabel: boolean;
  @Input() placeholder: string = '';
  @Input() fieldName: string;
  @Input() tabindex: number;
  @Input() updateOn: 'change' | 'blur' = 'blur';
  @Input() disabled = false;

  @HostBinding('class.kt-input-inline') @Input() inlineLabel = false;
  @HostBinding('class.kt-input-clean-display') @Input() cleanDisplayLabel = false;

  abstract model: NgModel;

  id: string;
  searchType: string;

  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach((f) => f(value));
    }
  }

  protected changed = new Array<(value: any) => void>();
  protected touched = new Array<() => void>();
  protected innerValue: any;
  protected cdr: ChangeDetectorRef;
  protected loggerSvc: ktLoggerService;
  protected ngValidators: (Function | Validator)[];
  protected notificationSvc: ktNotificationService;
  protected modelProxySvc: ktModelProxyService<any>;

  constructor(protected injector: Injector) {
    this.modelProxySvc = injector.get(ktModelProxyService, null);
    // implement modelvalidation svc and use with proxy
    this.loggerSvc = injector.get<ktLoggerService>(ktLoggerService);
    this.cdr = injector.get(ChangeDetectorRef);
    (<any>this.ngValidators) = injector.get(NG_VALIDATORS, null);
    this.notificationSvc = injector.get(ktNotificationService);
  }

  //---------------- DO NOT FORGET ----------------------
  // implement model validation bootstraping private method

  ngOnInit(): void {}

  ngAfterContentInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
    this.touched.push(fn);
  }

  markForCheck() {
    this.cdr.markForCheck();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.markForCheck();
  }

  blur() {
    this.touched.forEach((f) => f());
  }

}





