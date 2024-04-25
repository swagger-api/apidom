import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import LinkDescriptionElement from '../../../../elements/LinkDescription';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface LinkDescriptionVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class LinkDescriptionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: LinkDescriptionElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'LinkDescription']>;

  constructor(options: LinkDescriptionVisitorOptions) {
    super(options);
    this.element = new LinkDescriptionElement();
    this.specPath = always(['document', 'objects', 'LinkDescription']);
  }
}

export default LinkDescriptionVisitor;
