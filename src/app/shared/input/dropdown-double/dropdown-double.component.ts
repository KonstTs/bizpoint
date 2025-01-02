import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, HostBinding, Injector, Input, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ktInputBase } from '../input-base';
import {DropdownModule} from 'primeng/dropdown';
import { IktTextIconStyle } from '../../../model/icon.model';
import { IktDropdownDoubleValue } from '../../../model/dropdown-doouble.model';


const VALUE_ACCESSOR = { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ktDropdownDoubleComponent), multi: true };
// const kt_INPUT_BASE = { provide: ktInputBase, useExisting: forwardRef(() => ktDropdownDoubleComponent) };

@Component({
  selector: 'kt-dropdown-double',
  standalone: true,
  imports:[CommonModule, FormsModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './dropdown-double.component.html',
  styleUrls: ['./dropdown-double.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class ktDropdownDoubleComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  // static nextId = 0;
  // @HostBinding() id = `kt-dropdown-double-${ktDropdownDoubleComponent.nextId++}`;
  // name = `kt-dropdown-double-${ktDropdownDoubleComponent.nextId++}`;

  @ViewChild(NgModel) model: NgModel;

  @Input() label: string;
  @Input() selectionOptions: any[];
  @Input() operatorOptions: any[];
  @Input() selectionOptionLabel = 'label';
  @Input() selectionOptionValue = 'id';
  @Input() operatorOptionLabel = 'label';
  @Input() operatorOptionValue = 'id';
  @Input() style: any;
  @Input() operatorStyle: any;
  @Input() styleClass = 'kt-dropdown-double-control';
  @Input() inputStyleClass = 'kt-dropdown-double-input';
  @Input() panelStyleClass = 'kt-dropdown-double-panel';
  @Input() iconClass = '';
  @Input() iconColor: string;
  @Input() iconSize?: string;
  @Input() iconStyle: IktTextIconStyle;
  @Input() showClear: boolean;

//  item = {operator: undefined, selection: undefined}
  operator: string | number;
  selection: string | number;
 
  constructor(injector: Injector) {
    // super(injector);
    this.iconStyle = {
      'font-size': this.iconSize || '1.4rem',
      'color': this.iconColor || '#d3d3d3'
    }
  }

  private _onChange = (_: any) => {};
  private _onTouched = (_: any) => {};
  disabled = false;

  // private _value: IktDropdownDoubleValue = {operator: undefined, selection: undefined};
  _value: IktDropdownDoubleValue = {operator: undefined, selection: undefined};
  // _value: IktDropdownDoubleValue = {operator: tundefined, selection: undefined};

  set value(value: IktDropdownDoubleValue) {
    // if(this._value.operator && this._value.selection){
      this._value = value;
      if (this._isValid()) this._onChange(this._value);
      else this._onChange(null);
    // }
  }

  get value() {
    return this._value;
  }

  operatorUpdate(event: any) {
    // console.log('operatorUpdate event:', event)
    // additional check or process
    this._updateValue(event, 'operator')
  }

  selectionUpdate(event: any) {
    // console.log('selectionUpdate event:', event)
    // additional check or process
    this._updateValue(event, 'selection')
  }

  writeValue(value: IktDropdownDoubleValue): void {
    if (value && value !== null) {
      this._value = value;
    }
  }


  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
    // console.log('register on change');
  }

  registerOnTouched(fn: (_: any) => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private _isValid(): boolean {
    const val = this._value;
    return val && !(val === null || !val.operator || !val.selection);
  };

  private _updateValue(value: any, field: string) {
    const newValue = this._value;
    newValue[field] = value;
    this.value = newValue;
  }

  ngOnInit(): void {
    // super.ngOnInit();
  }

  ngAfterViewInit(): void {
    // super.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    // super.ngOnDestroy();
  }
}

