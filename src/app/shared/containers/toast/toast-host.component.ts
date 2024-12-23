import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: `
    <ng-container #vcr></ng-container>
  `
})
export class ktToastHostComponent {
    @ViewChild('vcr', { static: true, read: ViewContainerRef }) vcr: ViewContainerRef;
}
