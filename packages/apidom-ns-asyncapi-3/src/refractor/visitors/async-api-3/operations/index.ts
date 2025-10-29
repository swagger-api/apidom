import { Mixin } from 'ts-mixer';

import OperationsElement from '../../../../elements/Operations.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { always } from 'ramda';

/**
 * @public
 */
export interface OperationsVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}
/**
 * @public
 */
class OperationsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  
  declare public readonly element: OperationsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Operation']>;

  constructor(options: OperationsVisitorOptions) {
    super(options);
    this.element = new OperationsElement();
    this.specPath = always(['document', 'objects', 'Operation']);
  }

}

export default OperationsVisitor;