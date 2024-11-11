import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MainElement from '../../../../elements/Main.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

export interface MainVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class MainVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MainElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Main']>;

  constructor(options: MainVisitorOptions) {
    super(options);
    this.element = new MainElement();
    this.specPath = always(['document', 'objects', 'Main']);
  }
}

export default MainVisitor;
