import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import PrincipleElement from '../../../../elements/Principle';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

class PrincipleVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: PrincipleElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Principle']>;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new PrincipleElement();
    this.specPath = always(['document', 'objects', 'Principle']);
  }
}

export default PrincipleVisitor;
