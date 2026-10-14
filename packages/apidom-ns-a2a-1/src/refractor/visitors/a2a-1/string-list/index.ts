import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import StringListElement from '../../../../elements/StringList.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface StringListVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class StringListVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: StringListElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'StringList']>;

  constructor(options: StringListVisitorOptions) {
    super(options);
    this.element = new StringListElement();
    this.specPath = always(['document', 'objects', 'StringList']);
  }
}

export default StringListVisitor;
