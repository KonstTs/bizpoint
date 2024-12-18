export interface IjbFeedAd {
     uuid: string;
     published:  Date | string;
     expires:  Date | string;
     updated:  Date | string;
     workLocations: ΙJbFeedLocation[];
     contactList: ΙJbFeedContact[];
     title: string;
     description?:string;
     sourceurl?:string;
     source?:string;
     applicationUrl?:string;
     applicationDue?:string;
     occupationCategories: ΙJbFeedOccupation[];
     categoryList: ΙJbFeedCategory[];
     jobtitle?: string;
     link: string;
     employer: ΙJbFeedEmployer;
     engagementtype?:string;
     extent?:string;
     starttime?:string;
     positioncount?:string;
     sector?: string;
}

export interface ΙJbFeedLocation { 
     country?:string;
     address?:string;
     city?:string;
     postalCode?:string;
     county?:string;
     municipal?: string;
}

export interface ΙJbFeedContact {
     name?:string;
     email?:string;
     phone?:string;
     role?:string;
     title?:string
}

export interface ΙJbFeedCategory {
     categoryType :string;
     code: string;
     name: string;
     description?: string;
     score: number;

}

export interface ΙJbFeedOccupation {
     level1: string;
     level2: string
}

export interface ΙJbFeedEmployer { 
     name: string;
     orgnr?: string;
     description?: string;
     homepage?: string;
}