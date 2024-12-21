import { IktFeedAd } from "./feed-ad.model";
export interface IktFeedEntry { 
     uuid: string;
     status: string;
     title: string;
     businessName: string;
     municipal: string;
     sistEndret: Date | string;
}

export interface IktFeedEntryContent { 
     uuid: string;
     status: string;
     sistEndret: Date | string;
     ad_content: IktFeedAd;
}