import { Observable, of } from 'rxjs';
import { differenceInDays, formatRFC7231, startOfYesterday, subDays, subMonths, subWeeks, subYears } from 'date-fns';
import { InjectionToken } from '@angular/core';


export interface IPeriodFormatter {
  UIdate?: string | Date;
  APIdate?: string | Date;
  RFC1123Date?: string | Date;
  INTLdate?: string | Date;
  IntlOptions: object;
  dateSetup: object;
  setIntlOptions: (...args) => IPeriodFormatter;
  setStartDateTo: (...args) => IPeriodFormatter;
  setEndDateTo: (...args) => IPeriodFormatter;
  format: (...args) => IPeriodFormatter;
  formatDateForUI: (...args) => IPeriodFormatter;
  formatHTTPDateRFC1123: (...args) => IPeriodFormatter;
  convertDateForAPI: (...args) => IPeriodFormatter;
  countDaysBetween: (from, to) => number;
  offset: number;
}


export interface IPeriodProcessor {
  start: Date | string;
  end: Date | string;
  day: Date | string;
  week: Date | string;
  month: Date | string;
  trimester: Date | string;
  semester: Date | string;
  year: Date | string;
  formatter: IPeriodFormatter;
  // epoch: string;
  startDate: Date | string;
  endDate: Date | string;
  uidate: (_date) => Date | string;
  apidate: (_date) => Date | string;
  RFC1123: (_date) => Date | string;
  apiYesterday: () => Date | string;
  asStartDate: (_date) => IPeriodFormatter;
  asEndDate: (_date) => IPeriodFormatter;
  startingAt$: () => Observable<Date | string>
  endingAt$: () => Observable<Date | string>
}


export const PERIOD_PROCESSOR_DI = new InjectionToken('PeriodFactory')


export const Period = (_start?, _end?): IPeriodProcessor => {

  const Formatter:IPeriodFormatter = {
    UIdate: undefined,
    APIdate: undefined,
    RFC1123Date: undefined,
    INTLdate: undefined,
    IntlOptions: undefined,
    dateSetup: { year: 'numeric', month: 'numeric', day: 'numeric' },
    setIntlOptions: (options) =>{
      Formatter.IntlOptions = options;
      return Formatter
    },
    format: (date, options?, locale='el-GR') =>{
      const _options = options ?? Formatter.IntlOptions ?? Formatter.dateSetup;
      Formatter.INTLdate = new Intl.DateTimeFormat(locale, <any>_options).format(new Date(date));
      return Formatter;
    },
    formatDateForUI: (date, setup?) =>{
      const _setup = setup ?? Formatter.dateSetup;
      Formatter.UIdate = new Intl.DateTimeFormat('el-GR', <any>_setup).format(date);
      return Formatter;
    },
    formatHTTPDateRFC1123: (date) => {
        const ofst = Math.floor(new Date().getTimezoneOffset() / 60);
        const gmt = ofst.toString().substring(0,1)+Math.abs(ofst*100).toString().padStart(4,'0')
        Formatter.RFC1123Date = formatRFC7231(new Date(date)).replace('GMT', gmt);
        return Formatter;
    },
    setStartDateTo: (owner, date) =>{
      owner['startDate'] = date;
      return Formatter;
    },
    setEndDateTo: (owner, date) =>{
      owner['endDate'] = date;
      return Formatter;
    },
    convertDateForAPI: (date?) => {
      const _date = date ?? Formatter.UIdate;
      if(_date) Formatter.APIdate = _date.split('/').reverse().join('-');
      return Formatter;
    },
    countDaysBetween: (start, end) =>{
      return Math.abs(differenceInDays(new Date(start), new Date(end)));
    },
    offset: Math.floor(new Date().getTimezoneOffset() / 60)
  }


  const uidate = (_date) => Formatter.formatDateForUI(_date).UIdate;
  const apidate = (_date) => Formatter.convertDateForAPI(uidate(_date)).APIdate;
 
  const yesterday = apidate(startOfYesterday());
  const day = apidate(subDays(new Date(yesterday), 1));
  const week = apidate(subWeeks(new Date(yesterday), 1));
  const month = apidate(subMonths(new Date(yesterday), 1));
  const trimester = apidate(subMonths(new Date(yesterday), 3));
  const semester = apidate(subMonths(new Date(yesterday), 6));
  const year = apidate(subYears(new Date(yesterday), 1));


  const start = (_start && apidate(_start)) ?? week;
  const end = (_end && apidate(_end)) ?? yesterday;




  return new (function() {
    const self = this;


    // this.epoch =
    this.startDate =  
    this.formatter = Formatter;
    this.start = start;
    this.end = end;
    this.day = day;
    this.week = week;
    this.month = month;
    this.trimester = trimester;
    this.semester = semester;
    this.year = year;
    this.asStartDate = (_date) => Formatter.setStartDateTo(self, uidate(_date));
    this.asEndDate = (_date) => Formatter.setEndDateTo(self, uidate(_date));
    this.uidate = (_date) => uidate(_date);
    this.apidate = (_date) => apidate(_date);
    this.apiYesterday = () => apidate(startOfYesterday());
    this.startingAt$ = () => {
      return of(this.start);
    }
    this.endingAt$ = () => {
      return of(this.end);
    }
  })();
}



