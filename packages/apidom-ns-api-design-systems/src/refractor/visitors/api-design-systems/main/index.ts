import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MainElement from '../../../../elements/Main.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface MainVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class MainVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MainElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Main']>;

  constructor(options: MainVisitorOptions) {
    super(options);
    this.element = new MainElement();
    this.specPath = always(['document', 'objects', 'Main']);
  }
}

export default MainVisitor;
