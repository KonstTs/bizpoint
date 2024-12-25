import { AfterViewInit, Component, ContentChildren, HostBinding, Input, OnDestroy, OnInit, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustHTMLPipe } from '../../../pipes/html-sanitizer.pipe';
import { SESSIONSTORAGE_CACHE } from '../../../config/cache';
import { IktButtonConfig } from '../button/button.component';
import { ktListViewModelService } from './list-viewmodel.service';
import { DataViewLayoutChangeEvent, DataViewModule, DataViewPageEvent, DataViewSortEvent } from 'primeng/dataview';
import { IktListItemConfig, ktListItemComponent } from './list-item.component';
import { ktTemplateDirective } from '../../../directives/template.directive';
import { ktHeaderComponent } from '../header/header.component';


@Component({
  selector: 'kt-list',
  standalone: true,
  imports: [CommonModule, DataViewModule],
  providers: [SESSIONSTORAGE_CACHE],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ktListComponent implements OnInit, OnDestroy, AfterViewInit {
  static nextId = 0;
  @HostBinding() id = `kt-list-${ktListComponent.nextId++}`;

  // @Input() VM: ktListViewModelService<any>;
  @Input() items:any[];
  @Input() itemsConfig:IktListItemConfig[];
  @Input() rows = 100;
  @Input() layout:any = 'list'
  @Input() totalRecords:number;
  @Input() filterBy: 'title';
  @Input() trackBy;
  @Input() sortField;
  @Input() sortOrder:number;
  @Input() first = 1;
  @Input() paginator = true;
  @Input() rowsPerPageOptions;
  @Input() alwaysShowPaginator = true;
  @Input() paginatorPosition:any = 'bottom';
  @Input() pageLinks = 5;
  @Input() loading = false;
  @Input() loadingIcon;
  @Input() lazy = false;
  @Input() lazyLoadOnInit = false;
  @Input() gridStyleClass = 'kt-dataview-grid';
  @Input() styleClass: string;
  @Input() emptyMessage = 'Nothing here :(';
  @Input() pageFn:(...args) => void;
  @Input() sortFn:(...args) => void;
  @Input() layoutFn:(...args) => void;
  
  @ContentChildren(ktTemplateDirective) templates: QueryList<ktTemplateDirective>;

    headerTpl: TemplateRef<ktHeaderComponent>;
    listItemTpl: TemplateRef<ktListItemComponent>;
    gridItemTpl: TemplateRef<ktListItemComponent>;
    footerTpl: TemplateRef<any>;
  
  constructor(
    private _renderer: Renderer2, 
  ) { 
   
  }

  ngAfterContentInit(): void {
    this.templates.forEach((tpl) => {
        switch (tpl.name) {
            case 'header': this.headerTpl = tpl.template; break;
            case 'listItem': this.listItemTpl = tpl.template; break;
            case 'gridItem': this.gridItemTpl = tpl.template; break;
            case 'footer': this.footerTpl = tpl.template; break;
            default: throw new Error(`Unsupported template type ${tpl.name}`);
        }
    });
}

  onPage(e: DataViewPageEvent) {
    if(this.pageFn) this.pageFn(e);
  }
  onSort(e:DataViewSortEvent){
    if(this.sortFn) this.sortFn(e);
  }
  onChangeLayout(e:DataViewLayoutChangeEvent){
    if(this.layoutFn) this.layoutFn(e);
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }


    ngOnDestroy(): void {
    }

}

