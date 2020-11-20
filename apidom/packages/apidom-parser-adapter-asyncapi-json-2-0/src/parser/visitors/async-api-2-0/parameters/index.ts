import stampit from 'stampit';
import { test } from 'ramda';
import { isJsonObject, JsonNode } from 'apidom-ast';

import PatternedFieldsJsonObjectVisitor from '../../generics/PatternedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';
import { isReferenceObject } from '../../../predicates';

const ParametersVisitor = stampit(ValueVisitor, PatternedFieldsJsonObjectVisitor, {
  props: {
    specPath: (node: JsonNode) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isJsonObject(node)
        ? ['document', 'objects', 'Parameter']
        : ['value'];
    },
    fieldPatternPredicate: test(/^[A-Za-z0-9_\\-]+$/),
  },
  init() {
    this.element = new this.namespace.elements.Parameters();
  },
});

export default ParametersVisitor;
