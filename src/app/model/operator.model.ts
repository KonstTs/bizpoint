export interface ktOperatorModelType {
  typeName: 'string' | 'numeric' | 'boolean' | 'date' | 'all' | 'select';
  typeWeight?: number;
}

export interface ktOperatorModel {
  name: string;
  icon: string;
  symbol: string;
  // filter what operators will be available per type
  type?: ktOperatorModelType[];
}
