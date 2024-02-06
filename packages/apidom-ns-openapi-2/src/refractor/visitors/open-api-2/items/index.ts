import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ItemsElement from '../../../../elements/Items';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface ItemsVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class ItemsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ItemsElement;

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
