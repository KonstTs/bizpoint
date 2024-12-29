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

    terminate() {
        this._worker_.terminate();
    }


    process(ads: any): Promise<any> {
        return new Promise((resolve, _) => {
            this._worker_.postMessage(ads);
            this._worker_.onmessage = (e) => {
                resolve(e.data);
            };
        });
    }
}