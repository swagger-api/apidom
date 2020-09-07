import stampit from 'stampit';
import { StringElement } from 'minim';
import { isOperationElement, OperationElement } from 'apidom-ns-openapi3-1';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const PathItemVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'PathItem'],
  },
  init() {
    this.element = new this.namespace.elements.PathItem();
  },
  methods: {
    object(objectNode) {
      // @ts-ignore
      const result = FixedFieldsJsonObjectVisitor.compose.methods.object.call(this, objectNode);

      // decorate Operation elements with HTTP method
      this.element
        .filter(isOperationElement)
        .forEach((operationElement: OperationElement, httpMethodElementCI: StringElement) => {
          const httpMethod = httpMethodElementCI.toValue().toUpperCase();
          const httpMethodElementCS = new this.namespace.elements.String(httpMethod);
          operationElement.setMetaProperty('httpMethod', httpMethodElementCS);
        });

      return result;
    },
  },
});

export default PathItemVisitor;
