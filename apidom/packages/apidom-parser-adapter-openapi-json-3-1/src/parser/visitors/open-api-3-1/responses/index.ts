import stampit from 'stampit';
import { test, always } from 'ramda';
import { JsonNode, JsonObject } from 'apidom-ast';
import { isReferenceElement, ReferenceElement } from 'apidom-ns-openapi-3-1';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-json';

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
  methods: {
    object(objectNode: JsonObject) {
      // @ts-ignore
      const result = MixedFieldsJsonObjectVisitor.compose.methods.object.call(this, objectNode);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        appendMetadata(['openapi-reference-for-response'], referenceElement);
      });

      return result;
    },
  },
});

export default ResponsesVisitor;
