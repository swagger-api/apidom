import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ItemsElement from '../../../../elements/Items.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ItemsVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ItemsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ItemsElement;

  protected readonly specPath: SpecPath<['document', 'objects', 'Items']>;

  protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ItemsVisitorOptions) {
    super(options);
    this.element = new ItemsElement();
    this.specPath = always(['document', 'objects', 'Items']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ItemsVisitor;
