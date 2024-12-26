export interface ktModelChangeArgs<T> {
    target: any;
    property: keyof T;
    currentPath: string;
    propertyPath: string;
  }
  
  export interface ktModelChangingArgs<T> extends ktModelChangeArgs<T> {
    newValue: any;
    previousValue: any;
  }
  