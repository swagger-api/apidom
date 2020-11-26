import stampit from 'stampit';
import { test } from 'ramda';
import { isJsonObject, JsonNode, JsonObject } from 'apidom-ast';
import { isReferenceElement, ReferenceElement } from 'apidom-ns-asyncapi-2-0';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-json';

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
  methods: {
    object(objectNode: JsonObject) {
      // @ts-ignore
      const result = PatternedFieldsJsonObjectVisitor.compose.methods.object.call(this, objectNode);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        appendMetadata(['json-reference-for-parameter'], referenceElement);
      });

      return result;
    },
  },
});

export default ParametersVisitor;
