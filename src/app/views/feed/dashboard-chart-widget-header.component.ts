

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostBinding, Input, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ktButtonComponent, IktButtonConfig } from '../../shared/structure/button/button.component'
import { EChartsCoreOption } from 'echarts';
import { getElement } from '../../config/utils';
import { ktStackChartComponent } from '../../shared/charts/kt-stack-chart.component';
import { ktSectionHeader } from '../../shared/structure/header/header.component';


@Component({
    selector: 'kt-chart-widget-header',
    standalone: true,
    imports: [CommonModule, ktButtonComponent, ktStackChartComponent],
    template: `
        <div class="_header --kt-chart-stacked-widget kt-motion" [class]="headerClass">			
            <h2 class="kt-mrgr10 kt-ai-jc-center-flex kt-animation-slide-in-right --text-white">
                <span>{{ title }}</span>
                <span class="_descr --text-white" >Stats</span>
            </h2>
            <div class="kt-header-stacked-chart" style="width:50%">
                <kt-stack-chart #chart [merge]="stackData"></kt-stack-chart>
            </div>
            @if(!!actions?.length && !hideActions){
                <div class="kt-header-actions">
                    <kt-button *ngFor="let action of actions" [icon]="action.icon" class="kt-header-action" [ngStyle]="{'color': action.active ? action.activeColor : action.color }" [config]="action" (click)="action.command(action)"></kt-button>
            </div>
            }
            
		</div>
    `,
    styleUrls: ['../../views/feed/feed.component.scss'],
    styles: [`
        :host ::ng-deep button:enabled:active{background: none !important}
        .kt-header-stacked-chart{
            width: 50%; background: rgba(255,255,255,.4); border-radius: 22px; overflow: hidden; height: 20px;
            border-left:3px solid rgba(255,255,255,.1);border-right:3px solid rgba(255,255,255,.1)
        }
        
    `]
})


export class ktChartWidgetHeaderComponent extends ktSectionHeader implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('chart') chart: ktStackChartComponent;
    @Input() title: string;
    @Input() titleIcon?: string;
    @Input() subtitle?: string;
    @Input() actions?: IktButtonConfig[];
    @Input() headerClass: string;
    @Input() stackData: EChartsCoreOption;
    @Input() initOptions: EChartsCoreOption;
    resizer: ResizeObserver;


    constructor() {
        super();
    }

    ngAfterViewInit(): void {
        this.resizer = new ResizeObserver((oens) => {
            for (let oen of oens) {
                const { contentRect: { width, height } } = oen;
                setTimeout((_) => {
                    requestAnimationFrame(() => this.chart.instance.resize({ width: Math.floor(width), height: Math.floor(height) })), 300
                });
            }
        });
        this.resizer.observe(getElement('.kt-header-stacked-chart'));
    }
    ngOnInit(): void { }
    ngOnDestroy(): void { }
}



