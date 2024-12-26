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
import { kt_FEED_INIT_SEARCH_TOKEN, ktFeedViewModelService } from './feed-viewmodel.service';
import { IktFeedLine } from '../../api/model/feed-dto/feed.model';
import { ktListComponent } from '../../shared/structure/list/list.component';
import { kt_CELL_FORMATTER_TOKEN, ktCellRenderer } from '../../services/row-cell-renderers';
import { kt_INIT_FEED_SEARCH } from '../../config/feed';
import {ktTemplateDirective} from '../../directives/template.directive'
import { ktModelProxyService } from '../../services/model-proxy/model-proxy.service';
import { ktHeaderComponent } from '../../shared/structure/header/header.component';


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
		ktTemplateDirective
	],
	providers: [
		ktNotificationService,
		ktFeedViewModelService,
		ktDeviceService,
		ktModelProxyService,
		SESSIONSTORAGE_CACHE,
		LOCALSTORAGE_CACHE,
		{ provide: kt_CELL_FORMATTER_TOKEN, useFactory: ktCellRenderer },
		{ provide: kt_FEED_INIT_SEARCH_TOKEN, useValue: kt_INIT_FEED_SEARCH },
	],
	styleUrls: ['./feed.component.scss'],
	template: `
		<div class="feed --docked" [ngClass]="layout['hostClass']">
			<section class="widget --list">
				<kt-list 
					[items]="data" 
					[hdrConfig]="hdrConfig" 
					[hdrGraphic]="hdrGraphic" 
					[hdrControls]="hdrControls" 
					[hdrActions]="hdrActions"s
				>
				</kt-list>
			</section>
			<section class="widget --dock">

			</section>
			
		</div>
	`
})
export class ktFeedComponent implements OnInit, AfterViewInit, OnDestroy {

	// @ViewChild(ktTableComponent) ktTable: ktTableComponent;
	// @ViewChild(ktChartComponent) ktChart: ktChartComponent;
	@ViewChild('drawer', { read: ktSwipeDirective }) drawer: ktSwipeDirective;
	@HostBinding('class.mobile') get mobile() { 
		return this.bootstrapForMobile;
	}

	hdrConfig;
	hdrGraphic;
	hdrControls;
	hdrActions


	titleFeed = 'Feed';
	titleCharts = 'Stats';

	searchLabel = '';
	// orderOptions: IktSelectOptions[];
	modes: Ikt_FEED_MODE;
	layout: IktFeedLayoutType;
	
	// chartActions: ktButtonConfig[];
	// chartMobile = kt_CHART_MOBILE_OPTIONS;
	// chartDesktop = kt_CHART_OPTIONS;
	// chartDataD: EChartsCoreOption;
	// chartDataM: EChartsCoreOption;
	// stackData: EChartsCoreOption;
	
	drawerOpen = false;
	showDrawerTip;
	showDrawer = true;
	userSwipes = false;

	bootstrapForMobile: boolean;
data;
	search$: (e: any) => any;
	currencies$: () => Observable<string[]>;
	 

	constructor(
		public VM: ktFeedViewModelService,
		private _renderer: Renderer2,
		@Inject(ktDeviceService) private _deviceSvc:ktDeviceService,
		// @Inject(SelectMapperService) private _selectMapperSvc: SelectMapperService,
		@Inject(LOCALSTORAGE_CACHE_TOKEN) private _localStorage: IktCacheService,
	) {
		const { layouts, ordering, provideLayoutActionsFor, provideChartData } = dbc;
		this.VM.source$.subscribe(res => {
			this.data = res
			console.log('this.data:', this.data)
		})
		this._deviceSvc.isMobile$().subscribe(res => {
			this.bootstrapForMobile = res; 
		})

		// listen to the state and model updates 
		// this.VM.modelChanged$.pipe(untilDestroyed(this)).subscribe(_=>{
			// do some cool things with the updates
		// })

		// this.headerConfig = {
		// 	title: 'a title'
		// }
		
		this.modes = layouts;
		// this.orderOptions = ordering;
		// this.columnsMap = this.VM.columns.map((c, i) => ({ label: c.header, value: c.columnDef }));
		this.provideLayout('default');

		// this.VM.barchart$.subscribe(([d, v]) => { 
			// this.chartActions = provideLayoutActionsFor(layouts, this.provideLayout.bind(this));
			// const { desktop, mobile, stack } = provideChartData([d, v], this.VM);
			
			// this.chartDataD = desktop;
			// this.chartDataM = mobile;
			// this.stackData = stack;
		// });

		// this.search$ = (e) => {
		// 	this.ktTable.paginator.pageIndex = this.VM.filterModel.page = 1
		// 	return this.VM.getRows$(this.VM.filterModel).subscribe(res => {
		// 		if (res) this.VM.tableDataSource = new MatTableDataSource(res)
		// 	})
		// };

		// this.currencies$ = () => {
			// return this._selectMapperSvc.currencies() as any;
		// };
	}

	provideLayout(type: string) {
		if (this.layout?.id === type) return;
		// this.chartActions?.forEach(a => (a.active = a.id === type))
		this.layout = (<any>this.modes)[type];
	}

	drawerSwiped(e:IktSwipeEvent){
		const {element:{status, state}} = e;
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

	private cacheDrawerTip(){
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

	ngOnDestroy(): void {}
}
