import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, HostBinding, Injector, Input, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { ktInputBase } from '../input-base';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IktTextIconStyle } from '../../../model/icon.model';

const VALUE_ACCESSOR = { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ktTextComponent), multi: true };
const kt_INPUT_BASE = { provide: ktInputBase, useExisting: forwardRef(() => ktTextComponent) };


@UntilDestroy()
@Component({
  selector: 'kt-text',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule, TooltipModule, MessageModule],
  templateUrl: './text.component.html',
//   styleUrls: ['./text.component.scss'],
  providers: [VALUE_ACCESSOR, kt_INPUT_BASE],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ktTextComponent extends ktInputBase implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  static nextId = 0;
  searchType = 'string';

  @HostBinding() id = `kt-text-${ktTextComponent.nextId++}`;
  name = `kt-text-drop-${ktTextComponent.nextId++}`;

  @ViewChild(NgModel) model: NgModel;
  @ViewChild(Dropdown) operatorCtrl: Dropdown;

  @Input() tooltip?: string;
  @Input() tooltipEvent = 'focus';
  @Input() tooltipPosition = 'top';
  @Input() iconClass = '';
  @Input() iconSvgClass = '';
  @Input() iconSvg?: string;
  @Input() iconSize?: string;
  @Input() iconColor?: string;
  @Input() styles?: any
  @Input() isPhoneInput = false;
  @Input() customIconName = "";
  @Input() searchFn$: (e) => Observable<any[]>;
  @Input() blurFn: (e) => void;
  @Input() searchQuerySize = 3;
  iconStyle: IktTextIconStyle;
  iconSvgPath: string;
  private svgsPath = 'assets/icons/icons.svg#'


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
 
  search(e){
    if(this.searchFn$){
      const count = e.target.value.length;


      let srchto = setTimeout(_=> {
        clearTimeout(srchto);
        if(count === 0 || count >= this.searchQuerySize) this.searchFn$(e.target.value).pipe(take(1), untilDestroyed(this)).subscribe()
      }, 400)
    }
  }


  ngOnInit(): void {
    super.ngOnInit();
    if(this.iconSvg) this.iconSvgPath = this.svgsPath + this.iconSvg;
  }


  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
