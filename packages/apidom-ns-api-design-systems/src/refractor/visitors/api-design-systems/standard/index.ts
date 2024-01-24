import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import StandardElement from '../../../../elements/Standard';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

class StandardVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: StandardElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Standard']>;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new StandardElement();
    this.specPath = always(['document', 'objects', 'Standard']);
  }
}

export default StandardVisitor;
