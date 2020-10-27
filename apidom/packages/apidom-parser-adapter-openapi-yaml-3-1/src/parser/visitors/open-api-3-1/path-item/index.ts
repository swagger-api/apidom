import stampit from 'stampit';
import { StringElement } from 'minim';
import { always } from 'ramda';
import { isOperationElement, OperationElement } from 'apidom-ns-openapi-3-1';

import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const PathItemVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor).init(
  function PathItemVisitor() {
    this.element = new this.namespace.elements.PathItem();
    this.specPath = always(['document', 'objects', 'PathItem']);

    this.mapping = {
      leave() {
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
