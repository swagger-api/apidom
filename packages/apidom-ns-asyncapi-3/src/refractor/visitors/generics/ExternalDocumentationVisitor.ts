import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';
import { isReferenceElement } from '@swagger-api/apidom-ns-asyncapi-2';
import { T as stubTrue } from 'ramda';

import { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import AlternatingVisitor from './AlternatingVisitor.ts';
import { isReferenceLikeElement } from '../../predicates.ts';

export interface ExternalDocumentationVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ExternalDocumentationVisitor extends Mixin(AlternatingVisitor, FallbackVisitor) {
  constructor(options: ExternalDocumentationVisitorOptions) {
    super(options);
    this.alternator = [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'ExternalDocumentation'] },
    ];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = AlternatingVisitor.prototype.enter.call(this, objectElement);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'ExternalDocumentation');
    }

    return result;
  }
}

export default ExternalDocumentationVisitor;
