/// <reference lib="webworker" />
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ktFeedWorkerService {
    private _worker_: Worker;

    constructor() {
        this._worker_ = new Worker(new URL('../workers/feed.worker', import.meta.url));
    }

    terminate() {
        this._worker_.terminate();
    }

    process(feed: any): Promise<any> {
        return new Promise((resolve, _) => {
            this._worker_.postMessage(feed);
            this._worker_.onmessage = (e) => {
                resolve(e.data);
            };
        });
    }
}