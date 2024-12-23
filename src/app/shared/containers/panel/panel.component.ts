


import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, NgModule, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ktTemplateDirective } from '../../../directives/template.directive';


@Component({
  selector: 'kt-panel',
  templateUrl: './panel.component.html',
  standalone: true,
  styles: [`
    :host ::ng-deep { .p-scrollpanel-bar {transition: none}
}`],
  imports: [CommonModule, PanelModule, ScrollPanelModule],
})
export class ktPanelComponent implements OnInit, AfterContentInit {
  @Input() style: any;
  @Input() styleClass: string;
  @Input() label: string;
  @Input() toggleable = false;
  @Input() collapsed = false;
  @Input() toggler: 'icon' | 'header' = 'header';
  @Input() scrollable = false;


  @Output() collapsedChange = new EventEmitter<boolean>();


  @ContentChildren(ktTemplateDirective) templates: QueryList<ktTemplateDirective>;


  headerTpl: TemplateRef<unknown>;
  bodyTpl: TemplateRef<unknown>;
  footerTpl: TemplateRef<unknown>;


  constructor() {}


  ngOnInit(): void {
    this.initScrollable();
  }


  initScrollable(): void {
    if (!this.scrollable) return;


    if (!this.style) {
      this.style = { height: '100%' };
    }
  }


  ngAfterContentInit(): void {
    this.templates.forEach((tpl) => {
      switch (tpl.name) {
        case 'header':
          this.headerTpl = tpl.template;
          break;
        case 'body':
          this.bodyTpl = tpl.template;
          break;
        case 'footer':
          this.footerTpl = tpl.template;
          break;
        default:
          throw new Error(`Unsupported template type ${tpl.name}`);
      }
    });
  }
}



