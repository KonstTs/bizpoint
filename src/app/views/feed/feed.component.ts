import { AfterViewInit, Component, HostBinding, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FEED_CONFIG as dbc, Ikt_FEED_MODE, IktFeedLayoutType } from './feed-utils';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { SESSIONSTORAGE_CACHE, LOCALSTORAGE_CACHE, LOCALSTORAGE_CACHE_TOKEN, IktCacheService } from '../../config/cache';
import { ktSwipeDirective, IktSwipeEvent } from '../../directives/swipe.directive';
import { ktDeviceService } from '../../services/device.service';
import { ktNotificationService } from '../../services/notification.service';
import { ktTextComponent } from '../../shared/input/text/text.component';
import { IktFeedRow, kt_FEED_INIT_SEARCH_TOKEN, ktFeedViewModelService } from './feed-viewmodel.service';
import { ktListComponent } from '../../shared/structure/list/list.component';
import { kt_CELL_FORMATTER_TOKEN, ktCellRenderer } from '../../services/row-cell-renderers.factory';
import { kt_INIT_FEED_SEARCH } from '../../config/feed';
import { ktTemplateDirective } from '../../directives/template.directive'
import { ktModelProxyService } from '../../services/model-proxy/model-proxy.service';
import { IktHeaderBaseConfig, IktHeaderControls, IktHeaderGraphic, ktHeaderComponent } from '../../shared/structure/header/header.component';
import { IktActionsConfig, ktActionsComponent } from '../../shared/structure/actions/actions.component';
import { ktDropdownComponent } from '../../shared/input/dropdown/dropdown.component';
import { ktLoggerService } from '../../services/logger.service';
import { kt_ENVIRONMENT } from '../../config/environment';
import { EChartsCoreOption } from 'echarts';
import { ktChartComponent } from '../../shared/charts/kt-chart.component';
import { ktChartWidgetHeaderComponent } from './dashboard-chart-widget-header.component';
import { kt_CHART_MOBILE_OPTIONS, kt_CHART_OPTIONS } from '../../config/chart-base-options';
import { IktButtonConfig } from '../../shared/structure/button/button.component';
import { IktFeedAd } from '../../api/model/feed-dto/feed-ad.model';
import { IktListItemConfig } from '../../shared/structure/list/list-item.component';


@UntilDestroy()
@Component({
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ktTextComponent,
		ktSwipeDirective,
		ktListComponent,
		ktHeaderComponent,
		ktTemplateDirective,
		ktDropdownComponent,
		ktActionsComponent,
		ktChartComponent,
		ktChartWidgetHeaderComponent,
	],
	providers: [
		ktNotificationService,
		ktFeedViewModelService,
		ktDeviceService,
		ktModelProxyService,
		ktLoggerService,
		{ provide: kt_ENVIRONMENT, useValue: {} },
		SESSIONSTORAGE_CACHE,
		LOCALSTORAGE_CACHE,
		{ provide: kt_CELL_FORMATTER_TOKEN, useFactory: ktCellRenderer },
		{ provide: kt_FEED_INIT_SEARCH_TOKEN, useValue: kt_INIT_FEED_SEARCH },
	],
	styleUrls: ['./feed.component.scss'],
	template: `
		<div class="feed --docked" [ngClass]="layout['hostClass']">

			<section class="widget --list">
				<div class="kt-header kt-border-spin kt-width kt-rel" [ngClass]="hdrConfig?.cssClass" [ngStyle]="hdrConfig?.styles"> 
    				<div class="kt-jc-space-between-flex kt-ai-center-flex kt-overlay-white">
						<h2 class="__title kt-ai-center-flex">
							<strong class="kt-mrgr10 kt-text-motion-color">
								<span>{{data?.length}}</span>
							</strong>
							<span>{{hdrConfig.title}}</span>
						</h2>	
						<kt-text
							class="kt-header-input-text "
							name="filterModel"
							[iconClass]="'pi pi-search'"
							[searchFn$]="hdrControls.filterFn"
						></kt-text>
					</div>		
				</div>
				<kt-list class="kt-list-header-hide" [items]="data"></kt-list>
			</section>

			<section class="widget --dock">
				<kt-chart-widget-header
					[title]="titleCharts"
					[titleIcon]="'bar_chart_4_bars'"
					[actions]="chartActions"
					[headerClass]="'--bg-blue'"
					[stackData]="stackData"
				></kt-chart-widget-header>

				<div class="_charts kt-motion kt-animation-fade-in">
					<kt-chart [options]="chartDesktop" [merge]="chartDataD" [sizer]="'._charts'"></kt-chart>
				</div>
			</section>
			
		</div>
	`
})
export class ktFeedComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild(ktChartComponent) ktChart: ktChartComponent;
	@ViewChild('drawer', { read: ktSwipeDirective }) drawer: ktSwipeDirective;
	@HostBinding('class.mobile') get mobile() {
		return this.bootstraktorMobile;
	}
	titleFeed = 'Feed';
	titleCharts = 'Stats';

	searchLabel = '';
	// orderOptions: IktSelectOptions[];
	modes: Ikt_FEED_MODE;
	layout: IktFeedLayoutType;

	chartActions: IktButtonConfig[];
	chartMobile = kt_CHART_MOBILE_OPTIONS;
	chartDesktop = kt_CHART_OPTIONS;
	chartDataD: EChartsCoreOption;
	chartDataM: EChartsCoreOption;
	stackData: EChartsCoreOption;

	drawerOpen = false;
	showDrawerTip;
	showDrawer = true;
	userSwipes = false;

	bootstraktorMobile: boolean;
	data: IktFeedRow[];
	currencies$: () => Observable<string[]>;

	hdrConfig: IktHeaderBaseConfig;
	hdrGraphic: IktHeaderGraphic;
	hdrControls: IktHeaderControls;
	hdrActions: IktActionsConfig;

	constructor(
		public VM: ktFeedViewModelService,
		private _renderer: Renderer2,
		@Inject(ktDeviceService) private _deviceSvc: ktDeviceService,
		@Inject(LOCALSTORAGE_CACHE_TOKEN) private _localStorage: IktCacheService,
	) {
		const { layouts, ordering, provideLayoutActionsFor, provideChartData } = dbc;

		this._deviceSvc.isMobile$().subscribe(res => {
			this.bootstraktorMobile = res;
		})

		this.VM.source$.subscribe(res => {
			this.data = res
			console.log('this.data:', this.data)


		})

		this.hdrConfig = {
			title: `available job openings!`
		};

		this.hdrGraphic = {
			iconClass: 'pi-building-columns'
		};
		this.hdrControls = {};
		this.hdrActions = {};


		this.modes = layouts;
		// this.orderOptions = ordering;
		this.provideLayout('default');

		// this.VM.barchart$.subscribe(([d, v]) => { 
		// this.chartActions = provideLayoutActionsFor(layouts, this.provideLayout.bind(this));
		// const { desktop, mobile, stack } = provideChartData([d, v], this.VM);

		// this.chartDataD = desktop;
		// this.chartDataM = mobile;
		// this.stackData = stack;
		// });



	}

	provideLayout(type: string) {
		if (this.layout?.id === type) return;
		// this.chartActions?.forEach(a => (a.active = a.id === type))
		this.layout = (<any>this.modes)[type];
	}

	drawerSwiped(e: IktSwipeEvent) {
		const { element: { status, state } } = e;
		const limitUp = state[status].max;
		const limitDown = state[status].min;

		if (e.incrY <= limitUp) {
			this.provideLayout('default');
			e.element.reset();
			e.element.status = 'open';
			this.drawerOpen = true;
		}
		if (e.incrY > limitDown) {
			this.provideLayout('min')
			this._renderer.setStyle(e.element.nativeEl, 'transform', `translateY(0)`);
			e.element.status = 'closed';
			e.element.rect.y = 0;
			this.drawerOpen = false;
		};
		if (e.element.status === 'closed' && e.incrY <= limitDown) {
			this._renderer.setStyle(e.element.nativeEl, 'transform', `translateY(0)`);
		}
	}

	private cacheDrawerTip() {
		this._localStorage.set('kt-drawer-tip-disable', 'true');
	}

	private deCacheDrawerTip$() {
		return this._localStorage.get('kt-drawer-tip-disable')
	}


	ngOnInit(): void {
		this.VM.getList$().subscribe()
	}

	ngAfterViewInit(): void {
		this.deCacheDrawerTip$()
			.pipe(untilDestroyed(this))
			.subscribe(res => {
				this.showDrawerTip = !res;
				this.cacheDrawerTip();
			});

		setTimeout(_ => {
			this.drawer?.setStatus('open');
			this.drawerOpen = true;
			this.provideLayout('default');
		})
	}

	ngOnDestroy(): void { }
}


// <div class="sidebar">
// 					<kt-dropdown
// 						class="kt-double-control-first"
// 						label="config?.sortCtrLabel"
// 						name="sortModel"
// 						[optionSetFn]="hdrControls.sortFn"
// 						[options]="hdrControls.sortCtrlOptions"
// 						[optionLabel]="hdrControls.sortCtrlOptionLabel"
// 						[optionValue]="hdrControls.sortCtrlOptionValue"
// 						[appendTo]="'body'"
// 						>
// 					</kt-dropdown>
// 				</div>