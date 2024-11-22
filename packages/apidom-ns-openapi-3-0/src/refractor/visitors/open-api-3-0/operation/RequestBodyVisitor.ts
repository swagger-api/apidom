import { T as stubTrue } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import { isReferenceElement } from '../../../../predicates.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import AlternatingVisitor, {
  AlternatingVisitorOptions,
} from '../../generics/AlternatingVisitor.ts';
import { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface RequestBodyVisitorOptions
  extends AlternatingVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class RequestBodyVisitor extends AlternatingVisitor {
  constructor(options: RequestBodyVisitorOptions) {
    super(options);
    this.alternator = [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'RequestBody'] },
    ];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = AlternatingVisitor.prototype.enter.call(this, objectElement);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'requestBody');
    }

    return result;
  }
}

export default RequestBodyVisitor;
