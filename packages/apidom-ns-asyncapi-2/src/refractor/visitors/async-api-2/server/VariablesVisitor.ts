import { Mixin } from 'ts-mixer';

import ServerVariablesElement from '../../../../elements/nces/ServerVariables';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';

export interface VariablesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

class VariablesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ServerVariablesElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'ServerVariable']
  >;

  constructor(options: VariablesVisitorOptions) {
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
