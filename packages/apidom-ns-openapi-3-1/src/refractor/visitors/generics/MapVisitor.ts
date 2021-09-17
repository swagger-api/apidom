import stampit from 'stampit';
import { isNonEmptyString } from 'ramda-adjunct';

import PatternedFieldsVisitor from './PatternedFieldsVisitor';

const MapVisitor = stampit(PatternedFieldsVisitor, {
  props: {
    fieldPatternPredicate: isNonEmptyString,
  },
});

export default MapVisitor;
