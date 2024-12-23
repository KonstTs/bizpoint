import { Component } from '@angular/core';
import { ktNotificationContext, ktSeverity } from '../../../model/toast.model';
import { CommonModule } from '@angular/common';


@Component({
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-toast-message">
      <span
        class="p-toast-icon pi"
        [ngClass]="{
          'pi-info-circle': config.data.severity == 'info',
          'pi-exclamation-triangle': config.data.severity == 'warn',
          'pi-times-circle': config.data.severity == 'error',
          'pi-check': config.data.severity == 'success'
        }"
      ></span>


      <div class="p-toast-message-text-content">
        <h5>{{ config.data.summary }}</h5>
        <p class=" kt-txt-color-body">{{ config.data.detail }}</p>
      </div>
    </div>
  `,
    styles: [`
    .p-toast-message{box-shadow:none}
    .p-toast-icon.pi{font-weight:700;font-size:1.6rem}
  `]
})
export class ktToastDefaultContentComponent {
    constructor(public config: ktNotificationContext<{ summary: string; detail: string; severity: ktSeverity }>) {
    }
}
