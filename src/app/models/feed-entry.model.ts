import { IjbFeedAd } from "./feed-ad.model";
export interface IjbFeedEntry { 
     uuid: string;
     status: string;
     title: string;
     businessName: string;
     municipal: string;
     sistEndret: Date | string;
}

export interface IjbFeedEntryContent { 
     uuid: string;
     status: string;
     sistEndret: Date | string;
     ad_content: IjbFeedAd;
}