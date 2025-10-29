import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import MessageElement from '../../../../elements/Message.ts';
import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';

/**
 * @public
 */
export interface ChannelAddressExpressionsVisitorOptions
  extends PatternedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ChannelAddressExpressionsVisitor extends Mixin(PatternedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MessageElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Message']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: ChannelAddressExpressionsVisitorOptions) {
    super(options);
    this.element = new MessageElement();
    this.element.classes.push('servers');
    this.specPath = (element: unknown) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Message'];
    };
    this.canSupportSpecificationExtensions = false;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = PatternedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'message');
    });

    return result;
  }
}

export default ChannelAddressExpressionsVisitor;
