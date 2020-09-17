import stampit from 'stampit';
import { test } from 'ramda';
import { isJsonObject, JsonNode } from 'apidom-ast';

import { isReferenceObject, isResponseObject } from '../../../predicates';
import MixedFieldsJsonObjectVisitor from '../../generics/MixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const ResponsesVisitor = stampit(ValueVisitor, MixedFieldsJsonObjectVisitor, {
  props: {
    specPath: (node: JsonNode) => {
      /* eslint-disable no-nested-ternary */
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isResponseObject({}, node)
        ? ['document', 'objects', 'Response']
        : isJsonObject(node)
        ? ['document', 'objects', 'Responses']
        : ['value'];
      /* eslint-enable */
    },
    fieldPatternPredicate: test(/^\d{3}$/),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new this.namespace.elements.Responses();
  },
});

export default ResponsesVisitor;
