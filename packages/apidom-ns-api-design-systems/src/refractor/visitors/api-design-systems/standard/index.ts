import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import StandardElement from '../../../../elements/Standard.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface StandardVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class StandardVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: StandardElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Standard']>;

  constructor(options: StandardVisitorOptions) {
    super(options);
    this.element = new StandardElement();
    this.specPath = always(['document', 'objects', 'Standard']);
  }
}

export default StandardVisitor;
