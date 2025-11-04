import { Mixin } from 'ts-mixer';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import {
  isReferenceElement,
  isReferenceLikeElement,
  isSchemaElement,
} from '@swagger-api/apidom-ns-asyncapi-2';

import AlternatingVisitor, {
  AlternatingVisitorOptions,
} from '../../generics/AlternatingVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isMultiFormatSchemaElement } from '../../../../predicates.ts';
import { isMultiFormatSchemaLikeElement } from '../../../predicates.ts';

/**
 * @public
 */
export interface PayloadVisitorOptions extends AlternatingVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class PayloadVisitor extends Mixin(AlternatingVisitor, FallbackVisitor) {
  constructor(options: PayloadVisitorOptions) {
    super(options);
    this.alternator = [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      {
        predicate: isMultiFormatSchemaLikeElement,
        specPath: ['document', 'objects', 'MultiFormatSchema'],
      },
      { predicate: stubTrue, specPath: ['document', 'objects', 'Schema'] },
    ];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = AlternatingVisitor.prototype.enter.call(this, objectElement);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'ref-payload');
    }

    if (isSchemaElement(this.element)) {
      this.element.setMetaProperty('schema', 'payload-schema');
    }

    if (isMultiFormatSchemaElement(this.element)) {
      this.element.setMetaProperty('schema', 'payload-multiformat-schema');
    }

    return result;
  }
}

export default PayloadVisitor;
