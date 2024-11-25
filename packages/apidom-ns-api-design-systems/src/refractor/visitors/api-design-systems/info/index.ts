import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import InfoElement from '../../../../elements/Info.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface InfoVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class InfoVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: InfoElement;

  constructor(options: InfoVisitorOptions) {
    super(options);
    this.specPath = always(['document', 'objects', 'Info']);
    this.element = new InfoElement();
  }
}

export default InfoVisitor;
