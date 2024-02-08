import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsChannelBindingsElement from '../../../../elements/nces/ComponentsChannelBindings';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

export interface ChannelBindingsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class ChannelBindingsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsChannelBindingsElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'ChannelBindings']
  >;

  constructor(options: ChannelBindingsVisitorOptions) {
    super(options);
    this.element = new ComponentsChannelBindingsElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'ChannelBindings'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'channelBindings');
    });

    return result;
  }
}

export default ChannelBindingsVisitor;
