import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, HostBinding, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ktInputBase } from '../input-base';
import { IktTextIconStyle } from '../../../model/icon.model';
import { DropdownModule } from 'primeng/dropdown';
import { Observable, take } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';

const VALUE_ACCESSOR = { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ktDropdownComponent), multi: true };
const INPUT_BASE = { provide: ktInputBase, useExisting: forwardRef(() => ktDropdownComponent) };

@Component({
  selector: 'kt-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [VALUE_ACCESSOR, INPUT_BASE]
})
export class ktDropdownComponent extends ktInputBase implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  static nextId = 0;
  @HostBinding() id = `kt-dropdown-${ktDropdownComponent.nextId++}`;
  name = `kt-dropdown-${ktDropdownComponent.nextId++}`;

  @ViewChild(NgModel) model: NgModel;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() options: any[];
  @Input() field: string;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() filter = false;
  @Input() filterBy: string;
  @Input() dataKey: string;
  @Input() optionLabel = 'name';
  @Input() optionValue = 'id';
  @Input() forceSelection: boolean;
  @Input() style: any;
  @Input() styleClass = 'kt-dropdown-control';
  @Input() inputStyleClass = 'kt-dropdown-input';
  @Input() panelStyleClass = 'kt-dropdown-panel';
  @Input() dropdownIcon: string
  @Input() iconClass = '';
  @Input() iconColor: string;
  @Input() iconSize?: string;
  @Input() iconStyle: IktTextIconStyle;
  @Input() showClear: boolean;
  @Input() appendTo?: any;
  @Input() virtualScroll = false;
  @Input() virtualScrollItemSize?: number;
  @Input() optionSetFn: (...args) => void;
  @Input() optionsFn: (...args) => any[];
  @Input() optionsFn$: (...args) => Observable<any[]>;
  selection: any;

  constructor(injector: Injector) {
    super(injector);


    this.iconStyle = {
      'font-size': this.iconSize || '1.4rem',
      'color': this.iconColor || '#d3d3d3'
    }
  }

  optionSet(e) {
    if (this.optionSetFn) this.optionSetFn();
  }

  onChange = (_: any) => { };
  onTouched = () => { };

  valueChanged(value: any) {
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.selection = value;
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.optionsFn) this.options = this.optionsFn();
    if (this.optionsFn$) this.optionsFn$().pipe(take(1), untilDestroyed(this)).subscribe(res => this.options = res)
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

