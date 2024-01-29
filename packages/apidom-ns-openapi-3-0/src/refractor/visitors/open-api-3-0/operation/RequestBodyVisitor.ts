import { T as stubTrue } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import { isReferenceElement } from '../../../../predicates';
import { isReferenceLikeElement } from '../../../predicates';
import AlternatingVisitor, { AlternatingVisitorOptions } from '../../generics/AlternatingVisitor';

class RequestBodyVisitor extends AlternatingVisitor {
  constructor(options: AlternatingVisitorOptions) {
    super(options);
    this.alternator = [
      // @ts-ignore
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
