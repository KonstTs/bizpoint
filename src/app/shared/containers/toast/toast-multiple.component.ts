import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ktNotificationContext, ktSeverity } from '../../../model/toast.model';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: `
    <h2 class="p-mb-3">{{ config.data.title }}</h2>

    <div *ngFor="let message of config.data.messages" class="p-d-flex p-mb-2 -multiple">
      <span
        class="p-toast-icon pi"
        [ngClass]="{
          'pi-info-circle': message.severity == 'info',
          'pi-exclamation-triangle': message.severity == 'warn',
          'pi-times-circle': message.severity == 'error',
          'pi-check': message.severity == 'success'
        }"
      ></span>

      <div class="p-toast-message-text-content">
        <p class="p-mt-0">{{ message.body }}</p>
      </div>
    </div>
  `
})
export class ktToastMultipleContentComponent {
    constructor(public config: ktNotificationContext<{ title: string; messages: { body: string; severity: ktSeverity }[] }>) { }
}
