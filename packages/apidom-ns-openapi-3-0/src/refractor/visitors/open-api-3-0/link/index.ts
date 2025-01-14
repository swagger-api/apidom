import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { isStringElement, ObjectElement } from '@swagger-api/apidom-core';

import LinkElement from '../../../../elements/Link.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface LinkVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class LinkVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: LinkElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Link']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: LinkVisitorOptions) {
    super(options);
    this.element = new LinkElement();
    this.specPath = always(['document', 'objects', 'Link']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // mark this LinkElement with reference metadata
    if (isStringElement(this.element.operationId) || isStringElement(this.element.operationRef)) {
      this.element.classes.push('reference-element');
    }

    return result;
  }
}

export default LinkVisitor;
