import { Mixin } from 'ts-mixer';

import ServerVariablesElement from '../../../../elements/nces/ServerVariables';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';

class VariablesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ServerVariablesElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'ServerVariable']
  >;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new ServerVariablesElement();
    this.specPath = (element: unknown) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'ServerVariable'];
    };
  }
}

export default VariablesVisitor;
