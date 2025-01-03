import { Injectable, OnDestroy, Optional, InjectionToken, Inject } from '@angular/core';
import { isObservable, Observable, of, Subject } from 'rxjs';
import { ktModelChangingArgs, ktModelChangeArgs } from '../../model/model-state-args.model';
import { Change, ObservableSlim } from './observable-slim';
import { extractPropertyPath } from '../utils';

// ----------------- DO NOT FORGET -------------------
// IMPLEMENT MODEL VALIDATION

export const DATE_WITH_TIME_ZONE__FORMAT = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
let SYSTEM_DATE_FIELDS = ['createdAt', 'modifiedAt'];

export const MODEL_PROXY_CONFIG = new InjectionToken<{ systemDateFields: string[] }>('ktModelValidationConfig');
export type ProxyChangeType = 'arrayIndex' | 'arrayLength' | 'property';

@Injectable()
export class ktModelProxyService<T> implements OnDestroy {
  /**
   * Proxy of target. This should always be used in Angular two way binding.
   */
  get proxy(): T {
    return this._proxy;
  }

  /**
   * A deep clone of target object. It's synced with proxy.
   */
  get target(): T {
    return this.cloneObject(this._currentTarget);
  }

  /**
   * Observable of current Model state.
   */
  get isDirty$(): Observable<boolean> {
    return this._isDirty$.asObservable();
  }

  /**
   * Callback triggered when a property has changed. Contains information about the change.
   */
  modelChanged: (change: ktModelChangeArgs<T>) => void;

  /**
   * Callback triggered when a new item is added to an array. Contains information about the change.
   */
  detailAdded: (change: ktModelChangeArgs<T>) => void;

  /**
   * Callback triggered when a item is removed from an array. Contains information about the change.
   */
  detailRemoved: (change: ktModelChangeArgs<T>) => void;

  /**
   * Callback triggered when a property is changing. Contains information about the change.
   * If the function returns false, the change will not occur. Returns boolean or Observable<boolean>.
   */
  modelChanging: (change: ktModelChangingArgs<T>) => boolean | Observable<boolean>;

  private _pristineTarget: T;
  private _currentTarget: T;
  private _proxy: T;
  private _isDirty$ = new Subject<boolean>();
  private _emitChangeNotifications = true;

  //optionally inject model validation if impement in the future -> @Optional() private _modelValidationSvc: ktModelValidationService, 
  constructor(@Optional() @Inject(MODEL_PROXY_CONFIG) config: { systemDateFields: string[] }) {
    // if (this._modelValidationSvc) this._modelValidationSvc.initValidators();
    if (!!config?.systemDateFields?.length) SYSTEM_DATE_FIELDS = config.systemDateFields;
  }

  ngOnDestroy(): void {
    this._isDirty$.complete();
  }

  /**
   * Do not allow triggering modelChanged and modelChanging events.
   */
  suspendChangeNotifications() {
    this._emitChangeNotifications = false;
  }

  /**
   * Allow triggering modelChanged and modelChanging.
   */
  resumeChangeNotifications() {
    this._emitChangeNotifications = true;
  }

  /**
   * Returns true if target has any changes.
   */
  hasChanges(): boolean {
    return JSON.stringify(this._pristineTarget) !== JSON.stringify(this._currentTarget);
  }

  /**
   * Manually set model dirty
   */
  setDirty(dirty: boolean): void {
    this._isDirty$.next(dirty);
  }

  /**
   * Reset all target changes.
   */
  resetChanges(): void {
    this._currentTarget = this.cloneObject(this._pristineTarget);
    // if (this._modelValidationSvc) this._modelValidationSvc.removeValidations();
    this.createProxy(this._currentTarget);
  }

  /**
   * Set new target.
   */
  setTarget(target: T): void {
    this._pristineTarget = this.cloneObject(target);
    this._currentTarget = this.cloneObject(target);
    this.createProxy(this._currentTarget);
  }

  /**
   * Set target to have no changes.
   */
  acceptChanges(): void {
    // if (this._modelValidationSvc) this._modelValidationSvc.removeValidations();
    this.setDirty(false);
    this._pristineTarget = this.cloneObject(this._currentTarget);
  }

  cloneObject<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj), this.parseDateStrToDate);
  }

  private createProxy(target: T) {
    this.setDirty(false);
    this._proxy = ObservableSlim.create(target, false, this._modelChanging.bind(this), this._modelChanged.bind(this));
  }

  private _modelChanging(change: Change<T>): Observable<boolean> {
    const changeType = this.getChangeType(change);
    if (this.isArrayChange(changeType)) return of(true);

    if (this.modelChanging && this._emitChangeNotifications) {
      const modelChangingRes = this.modelChanging(this.changeToModelChangingArgs(change));
      return isObservable(modelChangingRes) ? modelChangingRes : of(modelChangingRes);
    }
    return of(true);
  }

  private _modelChanged(changes: Change<T>[]): void {
    this.setDirty(true);

    const modelChangeArgs = this.changeToModelChangeArgs(changes[0]);
    const changeType = this.getChangeType(changes[0]);

    if (this._emitChangeNotifications) {
      if (this.isArrayChange(changeType)) {
        if (changes[0].type === 'add') this.detailAdded && this.detailAdded(modelChangeArgs);
        else if (changes[0].type === 'delete') this.detailRemoved && this.detailRemoved(modelChangeArgs);
        else { this.modelChanged && this.modelChanged(modelChangeArgs) };
      }
      // modelValidationSvc add if implement in the future -> if (this._modelValidationSvc && changeType !== 'arrayIndex')
      if (changeType !== 'arrayIndex') {
        let validatorName = modelChangeArgs.propertyPath;
        if (changeType === 'arrayLength') validatorName = validatorName.replace('.length', '');
        // this._modelValidationSvc.execValidatorWithTarget(this._proxy, modelChangeArgs.target, validatorName);
      }
    }
  }

  private changeToModelChangingArgs(change: Change<T>): ktModelChangingArgs<T> {
    return { ...this.changeToModelChangeArgs(change), previousValue: change.previousValue, newValue: change.newValue } as ktModelChangingArgs<T>;
  }

  private changeToModelChangeArgs(change: Change<T>): ktModelChangeArgs<T> {
    return {
      currentPath: change.currentPath,
      propertyPath: extractPropertyPath(change.currentPath),
      property: change.property,
      target: change.proxy
    } as ktModelChangeArgs<T>;
  }

  private isArrayChange(changeType: ProxyChangeType): boolean {
    return ['arrayIndex', 'arrayLength'].indexOf(changeType) > -1;
  }

  private getChangeType(change: Change<T>): ProxyChangeType {
    /* Check if change is an array add / remove */
    if (!isNaN(change.property as any)) return 'arrayIndex';
    if (change.property === 'length' && Array.isArray(change.target)) return 'arrayLength';

    return 'property';
  }

  private parseDateStrToDate(key, value) {
    /*
     *  Convert all dates to Date objects.
     *  Ignore system fields, to avoid losing milliseconds precision.
     */
    if (SYSTEM_DATE_FIELDS.indexOf(key) === -1 && typeof value === 'string' && DATE_WITH_TIME_ZONE__FORMAT.test(value)) return new Date(value);
    return value;
  }
}
