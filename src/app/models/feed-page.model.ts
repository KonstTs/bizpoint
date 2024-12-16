import { IbpFeedItemModel } from "./feed-item.model";

export interface IbpFeedPageModel { 
    version?: string,
    title?: string,
    home_page_url?: string,
    feed_url?: string,
    description?: string,
    next_url?: string,
    id?: string,
    next_id?: string,
    items?: IbpFeedItemModel[];
}