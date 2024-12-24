import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, HostBinding, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ktInputBase } from '../input-base';
import { ListboxModule } from 'primeng/listbox';
import { Observable, take } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import { p_filterMatchMode } from '../../../config/prime';

const VALUE_ACCESSOR = { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ktListboxComponent), multi: true };
const INPUT_BASE = { provide: ktInputBase, useExisting: forwardRef(() => ktListboxComponent) };

@Component({
    selector: 'kt-listbox',
    standalone: true,
    imports: [CommonModule, FormsModule, ListboxModule],
    templateUrl: './listbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [VALUE_ACCESSOR, INPUT_BASE]
})
export class ktListboxComponent extends ktInputBase implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    static nextId = 0;
    @HostBinding() id = `kt-listbox-${ktListboxComponent.nextId++}`;
    name = `kt-listbox-${ktListboxComponent.nextId++}`;

    @ViewChild(NgModel) model: NgModel;

    @Input() options: any[];
    @Input() multiple = true;
    @Input() optionLabel = 'name';
    @Input() optionValue = 'id';
    @Input() selectAll: boolean;
    @Input() showToggleAll: boolean;
    @Input() tabindex: number;
    @Input() filter: boolean;
    @Input() filterBy: string;
    @Input() filterMatchMode: p_filterMatchMode = 'contains';
    @Input() filterFields: any[];
    @Input() filterValue: string;
    @Input() filterPlaceHolder: string;
    @Input() dataKey: string;
    @Input() readonly: boolean;
    @Input() disabled: boolean;
    @Input() listStyleClass: string;
    @Input() scrollHeight = '300px';
    @Input() style: Object;
    @Input() listStyle: Object;    
    @Input() styleClass: string;
    @Input() iconClass: string;
    @Input() iconStyle: Object;
    @Input() group: boolean;    
    @Input() optionGroupChildren: string;
    @Input() optionGroupLabel: string;
    @Input() checkbox: boolean;
    selection:any;
    // onFilter
    @Input() optionsFn: (...args) => any[];
    @Input() optionsFn$: (...args) => Observable<any[]>;
    @Input() filterFn: (...args) => void;

    constructor(injector: Injector) {
        super(injector);
    }
    
    onFilter(e){
        if(this.filterFn) this.filterFn(e);
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



