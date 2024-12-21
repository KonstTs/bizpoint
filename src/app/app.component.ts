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
    console.log(formatRFC7231(new Date()))
    const ofst = Math.floor(new Date().getTimezoneOffset() / 60)
    // ('0000'+number).match(/\d{4}$/);
    console.log(ofst.toString().substring(0,1)+Math.abs(ofst).toString().padStart(1,'0'))
   }
}
