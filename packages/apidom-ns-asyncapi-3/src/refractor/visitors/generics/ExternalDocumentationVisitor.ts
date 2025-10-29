import { Mixin } from 'ts-mixer';
import { ObjectElement, BREAK } from '@swagger-api/apidom-core';
import ExternalDocumentationElement from '../../../elements/ExternalDocumentation.ts';
import ReferenceElement from '../../../elements/Reference.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import { isReferenceElement, isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';
import AlternatingVisitor from './AlternatingVisitor.ts';
import { T as stubTrue } from 'ramda';

export interface ExternalDocumentationVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

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