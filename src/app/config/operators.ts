export const OPERATOR_SYMBOLS = {
    equalsCaseInsensitive: '==*',
    equalsCaseSensitive: '==',
    notEqualsCaseInsensitive: '!=*',
    notEqualsCaseSensitive: '!=',
    biggerThan: '>',
    smallerThan: '<',
    biggerThanOrEqual: '>=',
    smallerThanOrEqual: '<=',
    containSCaseInsensitive: '@=*',
    doesNotContainSCaseInsensitive: '!@=*',
    beginsWithCaseInsensitive: '_=*'
  };
  
  export type ktFilterOperatorId =
    | 'equalsCaseInsensitive'
    | 'equalsCaseSensitive'
    | 'notEqualsCaseInsensitive'
    | 'notEqualsCaseSensitive'
    | 'biggerThan'
    | 'smallerThan'
    | 'biggerThanOrEqual'
    | 'smallerThanOrEqual'
    | 'containsCaseInsensitive'
    | 'doesNotContainsCaseInsensitive'
    | 'beginsWithCaseInsensitive';
  
  export interface ktFilterOperatorInfo {
    id: ktFilterOperatorId;
    caption: string;
    symbol: string;
  }
  
  export const FILTER_OPERATORS: ktFilterOperatorInfo[] = [
    { id: 'equalsCaseInsensitive', caption: 'Equal to', symbol: OPERATOR_SYMBOLS.equalsCaseInsensitive },
    { id: 'equalsCaseSensitive', caption: 'Equal to', symbol: OPERATOR_SYMBOLS.equalsCaseSensitive },
    { id: 'notEqualsCaseInsensitive', caption: 'Not equal to', symbol: OPERATOR_SYMBOLS.notEqualsCaseInsensitive },
    { id: 'notEqualsCaseSensitive', caption: 'Not equal to', symbol: OPERATOR_SYMBOLS.notEqualsCaseSensitive },
    { id: 'biggerThan', caption: 'Greater than', symbol: OPERATOR_SYMBOLS.biggerThan },
    { id: 'smallerThan', caption: 'Lesser than', symbol: OPERATOR_SYMBOLS.smallerThan },
    { id: 'biggerThanOrEqual', caption: 'Greater than or equal', symbol: OPERATOR_SYMBOLS.biggerThanOrEqual },
    { id: 'smallerThanOrEqual', caption: 'Lesser than or equal', symbol: OPERATOR_SYMBOLS.smallerThanOrEqual },
    { id: 'containsCaseInsensitive', caption: 'Contains', symbol: OPERATOR_SYMBOLS.containSCaseInsensitive },
    { id: 'doesNotContainsCaseInsensitive', caption: 'Does not Contain', symbol: OPERATOR_SYMBOLS.doesNotContainSCaseInsensitive },
    { id: 'beginsWithCaseInsensitive', caption: 'Starts with', symbol: OPERATOR_SYMBOLS.beginsWithCaseInsensitive }
  ];
  