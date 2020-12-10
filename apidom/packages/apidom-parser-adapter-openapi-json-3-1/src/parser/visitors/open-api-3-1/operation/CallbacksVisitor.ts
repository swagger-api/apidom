import stampit from 'stampit';
import { isJsonObject, JsonNode, JsonObject } from 'apidom-ast';
import { isReferenceElement, ReferenceElement } from 'apidom-ns-openapi-3-1';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-json';

import MapJsonObjectVisitor from '../../generics/MapJsonObjectVisitor';
import { isReferenceObject } from '../../../predicates';
import { ValueVisitor } from '../../generics';

const CallbacksVisitor = stampit(ValueVisitor, MapJsonObjectVisitor, {
  props: {
    specPath: (node: JsonNode) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isJsonObject(node)
        ? ['document', 'objects', 'Callback']
        : ['value'];
    },
  },
  init() {
    this.element = new this.namespace.elements.Object();
    appendMetadata(['callbacks'], this.element);
  },
  methods: {
    object(objectNode: JsonObject) {
      const result = MapJsonObjectVisitor.compose.methods.object.call(this, objectNode);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'callback');
      });

      return result;
    },
  },
});

export default CallbacksVisitor;
