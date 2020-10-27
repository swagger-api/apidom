import stampit from 'stampit';
import { StringElement } from 'minim';
import { always } from 'ramda';
import { isOperationElement, OperationElement } from 'apidom-ns-openapi-3-1';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const PathItemVisitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'PathItem']),
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
