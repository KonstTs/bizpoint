import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, HostBinding, Injector, Input, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { ktInputBase } from '../input-base';
import { ktTextIconStyle } from '../../../model/icon.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const VALUE_ACCESSOR = { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ktTextComponent), multi: true };
const kt_INPUT_BASE = { provide: ktInputBase, useExisting: forwardRef(() => ktTextComponent) };

@UntilDestroy()
@Component({
    selector: 'kt-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    imports: [CommonModule, InputTextModule, MessageModule, TooltipModule, FormsModule, ReactiveFormsModule],
    standalone: true,
    providers: [VALUE_ACCESSOR, kt_INPUT_BASE],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ktTextComponent extends ktInputBase implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    @ViewChild(NgModel) model: NgModel;
    static nextId = 0;
    @HostBinding() id = `kt-text-${ktTextComponent.nextId++}`;
    name = `kt-text-${ktTextComponent.nextId++}`;
    searchType = 'string';

    @Input() tooltip?: string;
    @Input() tooltipEvent = 'focus';
    @Input() tooltipPosition = 'top';
    @Input() iconClass = '';
    @Input() iconSize?: string;
    @Input() iconColor?: string;
    @Input() styles?: any
    @Input() searchQuerySize = 3;
    @Input() searchFn$: (e) => Observable<any[]>;
    @Input() blurFn: (e) => void;
    iconStyle: ktTextIconStyle;


    constructor(injector: Injector) {
        super(injector);
        this.iconStyle = {
            'font-size': this.iconSize || '1.4rem',
            'color': this.iconColor || '#d3d3d3'
        }
    }

    onBlur(self) {
        if (this.blurFn) this.blurFn(self)
    }

    search(e) {
        if (this.searchFn$) {
            const {target:{value:{count}}} = e;

            setTimeout(_ => {
                if (count === 0 || count >= this.searchQuerySize) 
                    this.searchFn$(e.target.value)
                        .pipe(take(1), untilDestroyed(this))
                        .subscribe()
            }, 400)
        }
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






