import { ktFilterOperatorId } from '../config/operators';

export interface IktFilterModelDefinition {
  name?: string;
  caption?: string;
  required?: boolean;
  editable?: boolean;
  visible?: boolean;
  isAdvancedFilter?: boolean;
  fieldType?: 'string' | 'numeric' | 'date' | 'select' | 'bool';
  fieldConfig?: { [name: string]: unknown };
  filterOperators?: ktFilterOperatorId[];
  filterOperatorEditable?: boolean;
}

export type ktFilterModelValues = {
  [name: string]: { value: unknown; operator: ktFilterOperatorId };
};
