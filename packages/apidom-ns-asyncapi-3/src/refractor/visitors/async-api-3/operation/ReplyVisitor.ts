import { Mixin } from 'ts-mixer';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';
import { isReferenceElement } from '@swagger-api/apidom-ns-asyncapi-2';

import AlternatingVisitor, {
  AlternatingVisitorOptions,
} from '../../generics/AlternatingVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';

/**
 * @public
 */
export interface ReplyVisitorOptions extends AlternatingVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ReplyVisitor extends Mixin(AlternatingVisitor, FallbackVisitor) {
  constructor(options: ReplyVisitorOptions) {
    super(options);
    this.alternator = [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'OperationReply'] },
    ];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = AlternatingVisitor.prototype.enter.call(this, objectElement);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'operationReply');
    }

    return result;
  }
}

export default ReplyVisitor;
