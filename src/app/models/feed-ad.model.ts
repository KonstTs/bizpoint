export interface IbpFeedAd {
     uuid: string;
     published:  Date | string;
     expires:  Date | string;
     updated:  Date | string;
     workLocations: ΙbpFeedLocation[];
     contactList: ΙbpFeedContact[];
     title: string;
     description?:string;
     sourceurl?:string;
     source?:string;
     applicationUrl?:string;
     applicationDue?:string;
     occupationCategories: ΙbpFeedOccupation[];
     categoryList: ΙbpFeedCategory[];
     jobtitle?: string;
     link: string;
     employer: ΙbpFeedEmployer;
     engagementtype?:string;
     extent?:string;
     starttime?:string;
     positioncount?:string;
     sector?: string;
}

export interface ΙbpFeedLocation { 
     country?:string;
     address?:string;
     city?:string;
     postalCode?:string;
     county?:string;
     municipal?: string;
}

export interface ΙbpFeedContact {
     name?:string;
     email?:string;
     phone?:string;
     role?:string;
     title?:string
}

export interface ΙbpFeedCategory {
     categoryType :string;
     code: string;
     name: string;
     description?: string;
     score: number;

}

export interface ΙbpFeedOccupation {
     level1: string;
     level2: string
}

export interface ΙbpFeedEmployer { 
     name: string;
     orgnr?: string;
     description?: string;
     homepage?: string;
}