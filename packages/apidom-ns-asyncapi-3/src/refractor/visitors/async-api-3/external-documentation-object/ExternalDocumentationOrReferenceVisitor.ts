import { T as stubTrue } from 'ramda';
import { Element } from '@swagger-api/apidom-core';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';

import AlternatingVisitor, {
  AlternatingVisitorOptions,
} from '../../generics/AlternatingVisitor.ts';
import { isReferenceElement } from '../../../../predicates.ts';
import ExternalDocumentationElement from '../../../../elements/ExternalDocumentation.ts';
import ReferenceElement from '../../../../elements/Reference.ts';

export type { AlternatingVisitorOptions as ExternalDocumentationOrReferenceVisitorOptions };

/**
 * @public
 */
class ExternalDocumentationOrReferenceVisitor extends AlternatingVisitor {
  declare public element: ExternalDocumentationElement | ReferenceElement;

  constructor(options: AlternatingVisitorOptions) {
    super(options);
    this.alternator = [
      { predicate: isReferenceLikeElement, specPath: ['document', 'objects', 'Reference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'ExternalDocumentation'] },
    ];
  }

  enter(element: Element) {
    const result = AlternatingVisitor.prototype.enter.call(this, element);

    if (isReferenceElement(this.element)) {
      this.element.setMetaProperty('referenced-element', 'externalDocumentation');
    }

    return result;
  }
}

export default ExternalDocumentationOrReferenceVisitor;