import { HttpParams } from '@angular/common/http';
import { ktFilterModelValues } from './filters.model';

/* tslint:disable */
export interface IktFeedSearchModel {
  ifModifiedSince: Date | string;
  ifNoneMatchPageETag: Date | string;
  ifNoneMatchEntryETag: Date | string; 
  pageId: string,
  entryId: string
}