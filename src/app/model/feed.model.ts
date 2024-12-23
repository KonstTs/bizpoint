export interface IktFeedSearchModel {
    ifModifiedSince?: Date | string;
    ifNoneMatchPageETag?: Date | string;
    ifNoneMatchEntryETag?: Date | string; 
    pageId?: string,
    entryId?: string
  }