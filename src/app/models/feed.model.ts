import { IjbFeedEntry } from "./feed-entry.model";

export interface IjbFeed { 
    version: string,
    title: string,
    home_page_url: string,
    feed_url: string,
    description: string,
    next_url?: string,
    id: string,
    next_id?: string,
    items: IjbFeedLine[];
}

export interface IjbFeedLine {
    id: string,
    url: string,
    title: string,
    content_text: string,
    date_modified?: Date | string;
    _feed_entry: IjbFeedEntry;
}
