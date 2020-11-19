import stampit from 'stampit';
import { StringElement } from 'minim';
import { always } from 'ramda';
import { isOperationElement, OperationElement } from 'apidom-ns-openapi-3-1';
import { JsonObject } from 'apidom-ast';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const PathItemVisitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor).init(
  function PathItemVisitor() {
    this.element = new this.namespace.elements.PathItem();
    this.specPath = always(['document', 'objects', 'PathItem']);

    this.object = {
      enter(objectNode: JsonObject) {
        // @ts-ignore
        return FixedFieldsJsonObjectVisitor.compose.methods.object.call(this, objectNode);
      },
      leave() {
        // decorate Operation elements with HTTP method
        this.element
          .filter(isOperationElement)
          .forEach((operationElement: OperationElement, httpMethodElementCI: StringElement) => {
            const httpMethod = httpMethodElementCI.toValue().toUpperCase();
            const httpMethodElementCS = new this.namespace.elements.String(httpMethod);
            operationElement.setMetaProperty('httpMethod', httpMethodElementCS);
          });
      },
    };
  },
);

export default PathItemVisitor;
