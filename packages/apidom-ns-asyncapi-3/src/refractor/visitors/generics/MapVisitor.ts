import { isNonEmptyString } from 'ramda-adjunct';

import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from './PatternedFieldsVisitor.ts';

export type { SpecPath };

/**
 * @public
 */
export interface MapVisitorOptions extends PatternedFieldsVisitorOptions {}

/**
 * @public
 */
class MapVisitor extends PatternedFieldsVisitor {
  constructor(options: MapVisitorOptions) {
    super(options);
    this.fieldPatternPredicate = isNonEmptyString;
  }
}

export default MapVisitor;
