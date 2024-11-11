import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import StandardElement from '../../../../elements/Standard.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

export interface StandardVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class StandardVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: StandardElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Standard']>;

  constructor(options: StandardVisitorOptions) {
    super(options);
    this.element = new StandardElement();
    this.specPath = always(['document', 'objects', 'Standard']);
  }
}

export default StandardVisitor;
