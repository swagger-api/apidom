import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, isStringElement } from '@swagger-api/apidom-core';

import JSONReferenceElement from '../../../../elements/JSONReference.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface JSONReferenceVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class JSONReferenceVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: JSONReferenceElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'JSONReference']>;

  constructor(options: JSONReferenceVisitorOptions) {
    super(options);
    this.element = new JSONReferenceElement();
    this.specPath = always(['document', 'objects', 'JSONReference']);
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // mark this JSONReferenceElement with reference metadata
    if (isStringElement(this.element.$ref)) {
      this.element.classes.push('reference-element');
    }

    return result;
  }
}

export default JSONReferenceVisitor;
