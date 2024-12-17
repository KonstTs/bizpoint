import { IbpFeedAd } from "./feed-ad.model";
export interface IbpFeedEntry { 
     uuid: string;
     status: string;
     title: string;
     businessName: string;
     municipal: string;
     sistEndret: Date | string;
}

export interface IbpFeedEntryContent { 
     uuid: string;
     status: string;
     sistEndret: Date | string;
     ad_content: IbpFeedAd;
}