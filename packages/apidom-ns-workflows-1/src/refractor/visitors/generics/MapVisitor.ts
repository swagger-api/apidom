import { isNonEmptyString } from 'ramda-adjunct';

import PatternedFieldsVisitor, {
  SpecPath,
  PatternedFieldsVisitorOptions,
} from './PatternedFieldsVisitor';

export type { SpecPath };
export interface MapVisitorOptions extends PatternedFieldsVisitorOptions {}

class MapVisitor extends PatternedFieldsVisitor {
  constructor(options: MapVisitorOptions) {
    super(options);
    this.fieldPatternPredicate = isNonEmptyString;
  }
}

export default MapVisitor;
