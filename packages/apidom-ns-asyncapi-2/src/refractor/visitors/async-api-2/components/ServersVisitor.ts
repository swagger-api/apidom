import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsServersElement from '../../../../elements/nces/ComponentsServers.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';

/**
 * @public
 */
export interface ServersVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ServersVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ComponentsServersElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Server']
  >;

  constructor(options: ServersVisitorOptions) {
    super(options);
    this.element = new ComponentsServersElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Server'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'server');
    });

    return result;
  }
}

export default ServersVisitor;
