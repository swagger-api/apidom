import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MainElement from '../../../../elements/Main';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

class MainVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MainElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Main']>;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new MainElement();
    this.specPath = always(['document', 'objects', 'Main']);
  }
}

export default MainVisitor;
