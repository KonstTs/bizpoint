import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';


export type loadingType = 'progressSpinner' | 'progressBar' | 'skeleton';


@Component({
  selector: 'kt-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, ProgressBarModule, SkeletonModule],
})
export class ktLoadingComponent {
  @Input() isLoading = false;
  @Input() type: loadingType = 'progressSpinner';
}
