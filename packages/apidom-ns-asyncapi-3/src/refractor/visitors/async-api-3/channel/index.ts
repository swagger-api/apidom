import { Mixin } from 'ts-mixer';
import {
  ObjectElement,
} from '@swagger-api/apidom-core';
import { always } from 'ramda';

import ChannelElement from '../../../../elements/Channel.ts';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor from '../../FallbackVisitor.ts';

class ChannelVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ChannelElement;

  constructor(options: any) {
    super(options);
    this.element = new ChannelElement();
    this.specPath = always(['document','objects','Channel']); 
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    return result;
  }
}

export default ChannelVisitor;