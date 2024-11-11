import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import DiscriminatorElement from '../../../../elements/Discriminator.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

export interface DiscriminatorVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class DiscriminatorVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: DiscriminatorElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Discriminator']>;

  protected declare canSupportSpecificationExtensions: boolean;

  constructor(options: DiscriminatorVisitorOptions) {
    super(options);
    this.element = new DiscriminatorElement();
    this.specPath = always(['document', 'objects', 'Discriminator']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default DiscriminatorVisitor;
