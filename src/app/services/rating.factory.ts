import { IktRatingItemModel } from "../model/rating.model";


export const ktBaseRatingItem = (_icon = 'kt-icon icon-star', _activeColor = "#ffea00 !important"): IktRatingItemModel  => {
    return new function(){
        const self = this;

        this.icon = _icon;
        this.value = 0;
        this.active = false;
        this.color = "#ccc";
        this.activeColor = _activeColor;
        this.activeCssClass = "--active";
        this.activate = () => ((this.active = true), (this.value = 1));
        this.deactivate = () => ((this.active = false), (this.value = 0));
        this.setActive = (decision) => ((this.active = decision), (this.value = Number(this.active)));
        this.toggle = () => ((this.active = !this.active), (this.value = Number(this.active)));    
    }
}



export const ktStarRatingItem = (): IktRatingItemModel => ktBaseRatingItem('kt-icon icon-star');

export const ktRating = (_count = 5, _item?: IktRatingItemModel) => {
    const items = Array.from({length: _count}, () => ktBaseRatingItem('kt-icon icon-star'));
    const mood = (points) => {
        const setup = {
            0: 'neutral',
            1: 'sad',
            2: 'sad',
            3: 'sad',
            4: 'happy',
            5: 'happy'
        }
        return setup[points];
    }


    return new function(){
        const self = this;
        const scored = (active = this.items.filter(({active}) => active)) => (!!active.length ? active.reduce((nu, item) => nu += item.value ,0) : 0)
       
        this.rated = false;
        this.count = _count;
        this.items = items;
        this.score = 0;
        this.mood = 'neutral'
        this.rate = (_i) => {
            for (let i=0; i<_count; i++) self.items[i].setActive((i <= _i));
            const score = scored();
            self.score = score*2;
            self.mood = mood(score);
            self.rated = true;
        }
    }
}
