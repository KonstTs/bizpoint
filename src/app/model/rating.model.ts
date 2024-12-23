export interface IktRatingItemModel{
    icon: string;
    value: number;
    active: boolean;
    activeColor?: string;
    activeCssClass?: string;
    color?:  string;
    background?: string;
    size?: string,
    toggle?: () => void;
    activate?: (...args) => void;
    deactivate?: (...args) => void;
    setActive?: (...args) => void;
}


export interface IktRatingModel{
    rated: boolean;
    items: IktRatingItemModel[];
    count: number;
    score: number | any;
    mood: string;
    rate?: () => void;
}
