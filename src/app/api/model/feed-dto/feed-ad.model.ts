export interface IktFeedAd {
     uuid: string;
     published:  Date | string;
     expires:  Date | string;
     updated:  Date | string;
     workLocations: ΙktFeedLocation[];
     contactList: ΙktFeedContact[];
     title: string;
     description?:string;
     sourceurl?:string;
     source?:string;
     applicationUrl?:string;
     applicationDue?:string;
     occupationCategories: ΙktFeedOccupation[];
     categoryList: ΙktFeedCategory[];
     jobtitle?: string;
     link: string;
     employer: ΙktFeedEmployer;
     engagementtype?:string;
     extent?:string;
     starttime?:string;
     positioncount?:string;
     sector?: string;
}

export interface ΙktFeedLocation { 
     country?:string;
     address?:string;
     city?:string;
     postalCode?:string;
     county?:string;
     municipal?: string;
}

export interface ΙktFeedContact {
     name?:string;
     email?:string;
     phone?:string;
     role?:string;
     title?:string
}

export interface ΙktFeedCategory {
     categoryType :string;
     code: string;
     name: string;
     description?: string;
     score: number;

}

export interface ΙktFeedOccupation {
     level1: string;
     level2: string
}

export interface ΙktFeedEmployer { 
     name: string;
     orgnr?: string;
     description?: string;
     homepage?: string;
}