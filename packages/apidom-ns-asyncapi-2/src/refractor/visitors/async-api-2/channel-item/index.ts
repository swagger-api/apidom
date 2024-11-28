import { Mixin } from 'ts-mixer';
import { always } from 'ramda';
import { ObjectElement, isStringElement } from '@swagger-api/apidom-core';

import ChannelItemElement from '../../../../elements/ChannelItem.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ChannelItemVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ChannelItemVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ChannelItemElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'ChannelItem']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ChannelItemVisitorOptions) {
    super(options);
    this.element = new ChannelItemElement();
    this.specPath = always(['document', 'objects', 'ChannelItem']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // mark this ChannelItemElement with reference metadata
    if (isStringElement(this.element.$ref)) {
      this.element.classes.push('reference-element');
      this.element.setMetaProperty('referenced-element', 'channelItem');
    }

    return result;
  }
}

export default ChannelItemVisitor;
