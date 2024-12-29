/// <reference lib="webworker" />
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class ktAdsWorkerService {
    private _worker_: Worker;

    constructor() {
        this._worker_ = new Worker(new URL('../workers/ads.worker', import.meta.url));
    }

    process(ads: any): Promise<any> {
        return new Promise((resolve, _) => {
            console.log('process:', ads)
            this._worker_.postMessage(ads);
            this._worker_.onmessage = (e) => {
                console.log('e:', e)
                resolve(e.data);
            };
        });
    }
}