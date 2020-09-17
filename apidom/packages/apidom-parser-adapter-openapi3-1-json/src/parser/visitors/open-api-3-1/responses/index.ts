import stampit from 'stampit';
import { test, always } from 'ramda';
import { JsonNode } from 'apidom-ast';

import { isReferenceObject, isResponseObject } from '../../../predicates';
import MixedFieldsJsonObjectVisitor from '../../generics/MixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const ResponsesVisitor = stampit(ValueVisitor, MixedFieldsJsonObjectVisitor, {
  props: {
    specPathFixedFields: always(['document', 'objects', 'Responses']),
    specPathPatternedFields: (node: JsonNode) => {
      /* eslint-disable no-nested-ternary */
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isResponseObject({}, node)
        ? ['document', 'objects', 'Response']
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
