import { IbpFeedEntryModel } from "./feed-entry.model";

export interface IbpFeedItemModel { 
     id?: string;
     url?: string;
     title?: string;
     content_text?: string;
     date_modified?: Date | string;
     _feed_entry?: IbpFeedEntryModel[];
}