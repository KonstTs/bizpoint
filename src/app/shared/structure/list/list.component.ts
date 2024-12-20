import { AfterViewInit, Component, HostBinding, Input, NgModule, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { TrustHTMLPipe } from '../../../pipes/html-sanitizer.pipe';
import { ktDashboardViewModelService } from '../../../views/dashboard/dashboard-viewmodel.service';
import { SESSIONSTORAGE_CACHE } from '../../../config/cache';
import { ktButtonConfig } from '../button/button.component';


@Component({
  selector: 'kt-list',
  standalone: true,
  imports: [
    CommonModule, TrustHTMLPipe
  ],
  providers: [SESSIONSTORAGE_CACHE],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ktlistComponent implements OnInit, OnDestroy, AfterViewInit {
  static nextId = 0;
  //availanility flag
  loading;
    
  //DOM concerning variables
  @HostBinding() id = `kt-list-${ktlistComponent.nextId++}`;
  @ViewChild('filterCtrl') filterCtrl: MatInput;

  //exposed configuration
  @Input() VM: ktDashboardViewModelService;
  @Input() pagination: boolean = true;
  @Input() pagesize = 50;
  @Input() pagerClass: string
    
  @Input() searchable = true;
  @Input() sorlist: boolean;
  @Input() filterable: boolean;
  @Input() filterableColumns: boolean;
  @Input() reorderable = false;
  @Input() freeze: string[] = [];
  @Input() sticky = false;

  @Input() stripe = true;
  @Input() styles: any = undefined;

  @Input() rowActions: ktButtonConfig[] = [];
  @Input() hideActions = true;
  @Input() rowClickFn: ((...args: any) => void) | undefined;
  @Input() filterFn: ((e: UIEvent) => void) | undefined;

  constructor(private _renderer: Renderer2) { }

  onRowClick(row: any) {
    if (this.rowClickFn) this.rowClickFn(row);
  }

  onFilter(e: Event) {
    this.VM.listDataSource.filter = (e.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.VM.listDataSource.paginator) this.VM.listDataSource.paginator.firstPage();
  }

  ngOnInit(): void {
    this.VM.ngOnInit();
    // this.VM.isBusy$.subscribe(busy => { 
    //   this.loading = busy;
    // })
    
  }

  ngAfterViewInit(): void {
    // listen to global notifications
    // especially valuable for error handling and strategy conforming  
  
    setTimeout(_ => { 
      this.VM.isBusy$.subscribe(busy => { 
        this.loading = busy;
      })
    })
  }


    ngOnDestroy(): void {
      this.VM.ngOnDestroy()
    }

}

