import { isNonEmptyString } from 'ramda-adjunct';

import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
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
