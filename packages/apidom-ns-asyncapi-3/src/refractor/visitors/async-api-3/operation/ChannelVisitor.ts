import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';

/**
 * @public
 */
export interface ChannelVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ChannelVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ReferenceElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Reference']>;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: ChannelVisitorOptions) {
    super(options);
    this.element = new ReferenceElement();
    this.specPath = always(['document', 'objects', 'Reference']);
    this.canSupportSpecificationExtensions = false;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    if (isReferenceLikeElement(objectElement)) {
      this.element.classes.push('reference-element');
      this.element.setMetaProperty('referenced-element', 'channel');
    }

    return result;
  }
}

export default ChannelVisitor;
