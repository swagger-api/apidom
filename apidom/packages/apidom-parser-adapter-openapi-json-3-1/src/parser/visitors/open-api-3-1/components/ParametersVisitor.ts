import stampit from 'stampit';
import { JsonNode, JsonObject } from 'apidom-ast';
import { isReferenceElement, ReferenceElement } from 'apidom-ns-openapi-3-1';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-json';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';
import { ValueVisitor } from '../../generics';
import { isReferenceObject, isParameterObject } from '../../../predicates';

const ParametersVisitor = stampit(ValueVisitor, MapJsonObjectVisitor, {
  props: {
    specPath: (node: JsonNode) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isParameterObject({}, node)
        ? ['document', 'objects', 'Parameter']
        : ['value'];
    },
  },
  init() {
    this.element = new this.namespace.elements.Object();
    appendMetadata(['parameters'], this.element);
  },
  methods: {
    object(objectNode: JsonObject) {
      const result = MapJsonObjectVisitor.compose.methods.object.call(this, objectNode);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'parameter');
      });

      return result;
    },
  },
});

export default ParametersVisitor;
