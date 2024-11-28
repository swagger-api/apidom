import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import PrincipleElement from '../../../../elements/Principle.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface PrincipleVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class PrincipleVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: PrincipleElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Principle']>;

  constructor(options: PrincipleVisitorOptions) {
    super(options);
    this.element = new PrincipleElement();
    this.specPath = always(['document', 'objects', 'Principle']);
  }
}

export default PrincipleVisitor;
