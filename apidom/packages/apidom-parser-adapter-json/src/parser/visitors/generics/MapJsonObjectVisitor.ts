import stampit from 'stampit';
import { isNonEmptyString } from 'ramda-adjunct';

import PatternedFieldsJsonObjectVisitor from './PatternedFieldsJsonObjectVisitor';

const MapJsonObjectVisitor = stampit(PatternedFieldsJsonObjectVisitor, {
  props: {
    fieldPatternPredicate: isNonEmptyString,
  },
});

export default MapJsonObjectVisitor;
