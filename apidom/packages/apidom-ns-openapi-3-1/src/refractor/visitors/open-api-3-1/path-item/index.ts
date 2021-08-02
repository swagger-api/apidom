import stampit from 'stampit';
import { always } from 'ramda';
import { StringElement, ObjectElement, isStringElement } from 'apidom';

import PathItemElement from '../../../../elements/PathItem';
import OperationElement from '../../../../elements/Operation';
import { isOperationElement } from '../../../../predicates';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const PathItemVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'PathItem']),
  },
  init() {
    this.element = new PathItemElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate Operation elements with HTTP method
      this.element
        .filter(isOperationElement)
        .forEach((operationElement: OperationElement, httpMethodElementCI: StringElement) => {
          const httpMethod = httpMethodElementCI.toValue().toUpperCase();
          const httpMethodElementCS = new StringElement(httpMethod);
          operationElement.setMetaProperty('httpMethod', httpMethodElementCS);
        });

      // mark this PathItemElement with reference metadata
      if (isStringElement(this.element.$ref)) {
        this.element.classes.push('reference-element');
      }

      return result;
    },
  },
});

export default PathItemVisitor;
