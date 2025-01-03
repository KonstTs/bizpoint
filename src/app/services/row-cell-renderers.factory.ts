import { InjectionToken } from "@angular/core";

export interface ICurrencyFormatter {
  value?: number;
  currency?: string;
  locale?: string;
  style?: string;
  setCurrency: (...args: any) => ICurrencyFormatter;
  setLocale: (...args: any) => ICurrencyFormatter;
  format: (...args: any) => ICurrencyFormatter;
  formatWithOptions: (...args: any) => ICurrencyFormatter;
}

export interface IktCellRenderer {
  CurrencyFormatter: ICurrencyFormatter;
  cells:any;
  defaultCellColor:any;
  defaultCellBgColor:any;
  defaultCellStyle:any;
} 

export const kt_CELL_FORMATTER_TOKEN = new InjectionToken<IktCellRenderer>('kt_CELL_FORMATTER')

export const ktCellRenderer = () => {
  const defaultCellColor = 'inherit';
  const defaultCellBgColor = 'inherit';
 const defaultCellStyle = `color: ${defaultCellColor}; background-color: ${defaultCellBgColor}`;

  const CurrencyFormatter = {
    value: null,
    currency: 'usd',
    locale: 'en-US',
    style: 'currency',
    setCurrency: (_currency: string) => {
      CurrencyFormatter.currency = _currency;
      return CurrencyFormatter;
    },
    setLocale: (_locale: string) => {
      CurrencyFormatter.locale = _locale;
      return CurrencyFormatter;
    },
    format: (_value: number) => {
      const { locale: l, currency: c } = CurrencyFormatter;
      CurrencyFormatter.value = new Intl.NumberFormat(l, { style: 'currency', currency: c }).format(_value);
      return CurrencyFormatter;
    },
    formatWithOptions: (_value: number, _options:any) => {
      const { locale: l, currency: c } = CurrencyFormatter;
      CurrencyFormatter.value = new Intl.NumberFormat(l, { style: 'currency', currency: c, ..._options }).format(_value);
      return CurrencyFormatter;
    }
  };


  const cell = (_value,_style?) => `
     <span style="${_style??defaultCellStyle}">${_value}</span>
  `;
  const cell_image = (_src, _prepend='', _append='') => `
     <div class="kt-cell-image-wrapper kt-ai-center-flex">
        <span class="kt-cell-image-prepended kt-mrgr10">${_prepend}</span>
        <img class="kt-cell-image kt-mrgr10" src="${_src}"/>
        <span class="kt-cell-image-appended">${_append}</span>
      </div>
  `;
  
  const cell_currency = (_value,_style) => `
     ${cell(CurrencyFormatter.format(_value).value, _style)}
  `;

  


  return new function(){
    this.CurrencyFormatter = CurrencyFormatter;
    this.cells = {
      default: (v,s?) => cell(v,s),
      currency: (v,s?) => cell_currency(v,s),
      image: (s, p, a) => cell_image(s, p, a)
    }
    this.defaultCellColor = defaultCellColor;
    this.defaultCellBgColor = defaultCellBgColor;
    this.defaultCellStyle = defaultCellStyle;
  }
}
