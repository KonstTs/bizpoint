import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { p_filterOptions, p_zIndex } from './config/prime';
import { formatRFC7231 } from 'date-fns';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'bizpoint';
  constructor(
    private _config: PrimeNGConfig,
  ) {
    this._config.zIndex = p_zIndex;
    this._config.filterMatchModeOptions = p_filterOptions;
   }
}
