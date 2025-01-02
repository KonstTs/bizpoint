import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, HostBinding, Injector, Input, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import {AutoComplete, AutoCompleteModule} from 'primeng/autocomplete';
import { ktInputBase } from '../input-base';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import { IktTextIconStyle } from '../../../model/icon.model';


const VALUE_ACCESSOR = { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ktAutoCompleteComponent), multi: true };
const kt_INPUT_BASE = { provide: ktInputBase, useExisting: forwardRef(() => ktAutoCompleteComponent) };


@Component({
  selector: 'kt-autocomplete',
  standalone: true,
  imports:[CommonModule, FormsModule, ReactiveFormsModule, AutoCompleteModule],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [VALUE_ACCESSOR, kt_INPUT_BASE],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ktAutoCompleteComponent extends ktInputBase implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  static nextId = 0;
  searchType = 'string';

  @HostBinding() id = `kt-autocomplete-${ktAutoCompleteComponent.nextId++}`;
  name = `kt-autocomplete-${ktAutoCompleteComponent.nextId++}`;

  @ViewChild(NgModel) model: NgModel;
  @ViewChild('autoCompleteCtrl') ctrl: AutoComplete;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() field: string;
  @Input() multiple = true;
  @Input() minLength: number = 3;
  @Input() type: string = 'text';
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() unique;
  @Input() group: boolean;
  @Input() forceSelection: boolean;
  @Input() style: any;
  @Input() styleClass = 'kt-autocomplete-control';
  @Input() inputStyleClass = 'kt-autocomplete-input';
  @Input() panelStyleClass = 'kt-autocomplete-panel';
  @Input() dropdownIcon: string
  @Input() dropdown = false;
  @Input() dropdownMode = 'current'; // or 'blank'
  @Input() iconClass = '';
  @Input() iconColor: string;
  @Input() iconSize?: string;
  @Input() iconStyle: IktTextIconStyle;
  @Input() showClear: boolean;
  @Input() showEmptyMessage: boolean;
  @Input() emptyMessage: string
  @Input() dataKey: string;
  @Input() delay = 200;
  @Input() customIconName = "";
  @Input() searchFn$: (e) => Observable<any[]>;
  @Input() selectFn$: (e) => Observable<any>;
  @Input() selectFn: (e) => void;
  @Input() unselectFn: (e) => void;
  @Input() clearFn: (e?) => void;
  @Input() keyupFn: (e?) => void;
  @Input() blurFn: (e?) => void;
  @Input() selections: any | any[];
  suggestions$: Observable<any[]>;
  hasSuggestions = false;

  constructor(injector: Injector) {
    super(injector);

    this.iconStyle = {
      'font-size': this.iconSize || '1.4rem',
      'color': this.iconColor || '#d3d3d3'
    }
  }

  onBlur(self){
    if(this.blurFn) this.blurFn(self)
  }

  keyUp(self){
    if(this.keyupFn) this.keyupFn(self)
  }

  update(val){
    this.select(val)
    this.ctrl.focused = true;
  }

  select(e){
    if(this.selectFn)  this.selectFn(e);  
    if(this.selectFn$) this.selectFn$(e).pipe(take(1), untilDestroyed(this)).subscribe();
  }

  unselect(e){
    if(this.unselectFn) this.unselectFn(e);
  }

  clear(e){
    if(this.clearFn) this.clearFn(e)
  }

  search$(e){
    this.suggestions$ = this.searchFn$(e).pipe(
        switchMap(res => res ? of((<any>res)?.result) : of([])),
        tap(results => Array.isArray(results.at(0)) ? this.hasSuggestions = true : this.hasSuggestions = false),
        take(1), untilDestroyed(this))
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
