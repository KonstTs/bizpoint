export interface IktOperatorModelType {
  typeName: 'string' | 'numeric' | 'boolean' | 'date' | 'all' | 'select';
  typeWeight?: number;
}

export interface IktOperatorModel {
  name: string;
  icon: string;
  symbol: string;
  // filter what operators will be available per type
  type?: IktOperatorModelType[];
}
