import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import ChannelsElement from '../../../../elements/Channels.ts';
import { isReferenceElement } from '../../../../predicates.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';

/**
 * @public
 */
export interface ChannelsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ChannelsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ChannelsElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'Channel']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: ChannelsVisitorOptions) {
    super(options);
    this.element = new ChannelsElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Channel'];
    this.canSupportSpecificationExtensions = false;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'channel');
    });

    return result;
  }
}

export default ChannelsVisitor;
