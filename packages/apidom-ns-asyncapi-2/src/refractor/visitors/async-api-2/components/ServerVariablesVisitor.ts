import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ComponentsServerVariablesElement from '../../../../elements/nces/ComponentsServerVariables';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

export interface ServerVariablesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class ServerVariablesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ComponentsServerVariablesElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'ServerVariable']
  >;

  constructor(options: ServerVariablesVisitorOptions) {
    super(options);
    this.element = new ComponentsServerVariablesElement();
    this.specPath = (element: unknown) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'ServerVariable'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = MapVisitor.prototype.ObjectElement.call(this, objectElement);

    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      referenceElement.setMetaProperty('referenced-element', 'serverVariable');
    });

    return result;
  }
}

export default ServerVariablesVisitor;
