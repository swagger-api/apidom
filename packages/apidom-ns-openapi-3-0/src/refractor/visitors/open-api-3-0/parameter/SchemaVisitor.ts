import { Mixin } from 'ts-mixer';
import { T as stubTrue } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import AlternatingVisitor, { AlternatingVisitorOptions } from '../../generics/AlternatingVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

class SchemaVisitor extends Mixin(AlternatingVisitor, FallbackVisitor) {
  constructor(options: AlternatingVisitorOptions) {
    super(options);
    this.alternator = [
      // @ts-ignore
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'Schema'] },
    ];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = AlternatingVisitor.prototype.enter.call(this, objectElement);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'schema');
    }

    return result;
  }
}

export default SchemaVisitor;
