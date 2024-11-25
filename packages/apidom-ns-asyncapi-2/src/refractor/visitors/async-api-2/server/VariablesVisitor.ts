import { Mixin } from 'ts-mixer';

import ServerVariablesElement from '../../../../elements/nces/ServerVariables.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceLikeElement } from '../../../predicates.ts';

/**
 * @public
 */
export interface VariablesVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
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
