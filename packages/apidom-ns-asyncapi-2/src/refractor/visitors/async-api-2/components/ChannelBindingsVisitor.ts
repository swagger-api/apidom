import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference.ts';
import ComponentsChannelBindingsElement from '../../../../elements/nces/ComponentsChannelBindings.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';

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
