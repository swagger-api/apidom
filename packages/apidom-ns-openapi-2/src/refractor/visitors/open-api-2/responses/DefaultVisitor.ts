import { Mixin } from 'ts-mixer';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement, isResponseElement } from '../../../../predicates';
import AlternatingVisitor, {
  AlternatingVisitorOptions,
  Alternator,
} from '../../generics/AlternatingVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class DefaultVisitor extends Mixin(AlternatingVisitor, FallbackVisitor) {
  public declare readonly alternator: Alternator[];

  constructor(options: AlternatingVisitorOptions) {
    super(options);
    this.alternator = [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'Response'] },
    ];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = AlternatingVisitor.prototype.enter.call(this, objectElement);

    // decorate ReferenceElement with type of referencing element
    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'response');
    } else if (isResponseElement(this.element)) {
      this.element.setMetaProperty('http-status-code', 'default');
    }

    return result;
  }
}

export default DefaultVisitor;
