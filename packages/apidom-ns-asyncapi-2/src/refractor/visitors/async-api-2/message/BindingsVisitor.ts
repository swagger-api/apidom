import { Mixin } from 'ts-mixer';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import AlternatingVisitor, { AlternatingVisitorOptions } from '../../generics/AlternatingVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

export interface BindingsVisitorOptions extends AlternatingVisitorOptions, FallbackVisitorOptions {}

class BindingsVisitor extends Mixin(AlternatingVisitor, FallbackVisitor) {
  constructor(options: BindingsVisitorOptions) {
    super(options);
    this.alternator = [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'MessageBindings'] },
    ];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = AlternatingVisitor.prototype.enter.call(this, objectElement);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'messageBindings');
    }

    return result;
  }
}

export default BindingsVisitor;
