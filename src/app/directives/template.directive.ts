import { Directive, Input, TemplateRef } from '@angular/core';
import { ktTemplateType } from '../model/template.model';

@Directive({ 
    selector: '[ktTemplate]',
    standalone: true,
})
export class ktTemplateDirective {
  @Input('ktTemplate') name: ktTemplateType;
  constructor(public template: TemplateRef<any>) {}
}
