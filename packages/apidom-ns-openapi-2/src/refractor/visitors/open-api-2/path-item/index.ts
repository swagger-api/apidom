import stampit from 'stampit';
import { always } from 'ramda';
import {
  StringElement,
  ObjectElement,
  isStringElement,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

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
          const httpMethodElementCS = cloneDeep(httpMethodElementCI);
          httpMethodElementCS.content = toValue(httpMethodElementCS).toUpperCase();
          operationElement.setMetaProperty('http-method', httpMethodElementCS);
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
