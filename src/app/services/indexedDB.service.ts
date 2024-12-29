import { Injectable } from '@angular/core';

   @Injectable({ providedIn: 'root' })
   export class DatabaseService {
       private dbPromise: Promise<IDBDatabase>;

       constructor() {
           this.dbPromise = new Promise((resolve, reject) => {
               const request = indexedDB.open('myDatabase', 1); 

               request.onerror = (event) => {
                   console.error('IndexedDB error:', event);
                   reject(event);
               };

               request.onsuccess = (event) => {
                   const db = (event.target as IDBOpenDBRequest).result;
                   resolve(db);
               };

               request.onupgradeneeded = (event) => {
                   const db = (event.target as IDBOpenDBRequest).result;
                   if (!db.objectStoreNames.contains('myObjectStore')) { 
                       db.createObjectStore('myObjectStore', { keyPath: 'id' });
                   }
               };
           });
       }


       public getItem(key: string): Promise<any> {
           return this.dbPromise.then(db => {
               return new Promise((resolve, reject) => {
                   const transaction = db.transaction(['myObjectStore'], 'readonly'); 
                   const objectStore = transaction.objectStore('myObjectStore'); 
                   const request = objectStore.get(key);

                   request.onerror = (event) => {
                       console.error('Error getting item:', event);
                       reject(event);
                   };

                   request.onsuccess = (event) => {
                       resolve(request.result);
                   };
               });
           });
       }

       public setItem(key: string, value: any): Promise<void> {
           return this.dbPromise.then(db => {
               return new Promise((resolve, reject) => {
                   const transaction = db.transaction(['myObjectStore'], 'readwrite');
                   const objectStore = transaction.objectStore('myObjectStore');
                   const request = objectStore.put({ id: key, value: value });

                   request.onerror = (event) => {
                       console.error('Error setting item:', event);
                       reject(event);
                   };

                   request.onsuccess = (event) => {
                       resolve();
                   };
               });
           });
       }

       //delete method pending -------------------
   }