import { AfterViewInit, Component, forwardRef, HostBinding, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { ktInputBase } from '../input-base';
import { Observable, take } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import {MatInputModule} from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { getElement } from '../../../config/utils';


export interface IktSelectOptions {
    name?: string;
    title?: string;
    value?: string;
    caption?: string;
    data?: any;
    data$?: Observable<any>;
}
const VALUE_ACCESSOR = { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ktSelectComponent), multi: true };
const kt_INPUT_BASE = { provide: ktInputBase, useExisting: forwardRef(() => ktSelectComponent) };


@Component({
  selector: 'kt-select',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatSelect],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [VALUE_ACCESSOR, kt_INPUT_BASE]
})
export class ktSelectComponent extends ktInputBase implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  static nextId = 0;

  @HostBinding() id = `kt-select-${ktSelectComponent.nextId++}`;
  name = `kt-select-${ktSelectComponent.nextId++}`;
  @ViewChild(NgModel) model: NgModel;
  @ViewChild(MatSelect) select: MatSelect;
  
  selected:any;
  @Input() label: string;
  @Input() options: any[];
  @Input() multiple = false;
  @Input() field: string;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';
  
  @Input() optionsFn: (...args: any) => any[];
  @Input() optionsFn$: (...args: any) => Observable<any[]>;

  constructor(injector: Injector) { 
    super(injector);
  }

  close(){}
  onChange = (_: any) => {};
  onTouched = () => {};

  valueChanged(value: any) {
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.selected = value;
  }

  ngOnInit(): void {
    super.ngOnInit();
    if(this.optionsFn) this.options = this.optionsFn();
    if(this.optionsFn$) this.optionsFn$().pipe(take(1), untilDestroyed(this)).subscribe(res => this.options = res);
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.select.openedChange.pipe(untilDestroyed(this)).subscribe(open => {
      setTimeout(_ => {
        const clicker = getElement('.cdk-overlay-connected-position-bounding-box') as HTMLElement;
        if (clicker) clicker.onclick = () => this.select.close();
        this.select.panel?.nativeElement?.addEventListener('mouseleave', () => setTimeout(() => this.select.close(), 300))
      })
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

