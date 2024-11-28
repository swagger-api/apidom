import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsSecuritySchemesElement from '../../../../elements/nces/ComponentsSecuritySchemes.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface SecuritySchemesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class SecuritySchemesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public element: ComponentsSecuritySchemesElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'SecurityScheme']
  >;

  constructor(options: SecuritySchemesVisitorOptions) {
    super(options);
    this.element = new ComponentsSecuritySchemesElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'SecurityScheme'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'securityScheme');
    });

    return result;
  }
}

export default SecuritySchemesVisitor;
