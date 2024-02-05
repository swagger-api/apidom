import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsServerBindingsElement from '../../../../elements/nces/ComponentsServerBindings';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

export interface ServerBindingsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class ServerBindingsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare element: ComponentsServerBindingsElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'ServerBindings']
  >;

  constructor(options: ServerBindingsVisitorOptions) {
    super(options);
    this.element = new ComponentsServerBindingsElement();
    this.specPath = (element: unknown) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'ServerBindings'];
    };
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'serverBindings');
    });

    return result;
  }
}

export default ServerBindingsVisitor;
