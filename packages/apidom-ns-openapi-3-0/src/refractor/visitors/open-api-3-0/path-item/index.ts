import { Mixin } from 'ts-mixer';
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
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class PathItemVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: PathItemElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'PathItem']>;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new PathItemElement();
    this.specPath = always(['document', 'objects', 'PathItem']);
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate Operation elements with HTTP method
    this.element
      .filter(isOperationElement)
      // @ts-ignore
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
  }
}

export default PathItemVisitor;
