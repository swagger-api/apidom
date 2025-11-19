import { Mixin } from 'ts-mixer';
import { test } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';

import PatternedFieldsVisitor, {
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/PatternedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import MessagesElement from '../../../../elements/Messages.ts';
import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceElement } from '../../../../predicates.ts';
import MapVisitor from '../../generics/MapVisitor.ts';

/**
 * @public
 */
export interface MessagesVisitorOptions
  extends PatternedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MessagesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: MessagesElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Message']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: MessagesVisitorOptions) {
    super(options);
    this.element = new MessagesElement();
    this.element.classes.push('messages');
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

export default MessagesVisitor;
