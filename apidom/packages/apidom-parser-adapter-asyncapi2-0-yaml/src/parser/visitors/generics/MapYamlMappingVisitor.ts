import stampit from 'stampit';
import { isNonEmptyString } from 'ramda-adjunct';

import PatternedFieldsYamlMappingVisitor from './PatternedFieldsYamlMappingVisitor';

const MapYamlMappingVisitor = stampit(PatternedFieldsYamlMappingVisitor, {
  props: {
    fieldPatternPredicate: isNonEmptyString,
  },
});

export default MapYamlMappingVisitor;
