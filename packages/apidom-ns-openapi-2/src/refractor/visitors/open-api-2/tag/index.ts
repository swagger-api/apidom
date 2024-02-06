import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import TagElement from '../../../../elements/Tag';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface TagVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class TagVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: TagElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Tag']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: TagVisitorOptions) {
    super(options);
    this.element = new TagElement();
    this.specPath = always(['document', 'objects', 'Tag']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default TagVisitor;
