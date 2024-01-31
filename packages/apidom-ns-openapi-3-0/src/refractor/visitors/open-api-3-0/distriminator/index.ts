import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import DiscriminatorElement from '../../../../elements/Discriminator';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class DiscriminatorVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: DiscriminatorElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Discriminator']>;

  public declare canSupportSpecificationExtensions: boolean;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new DiscriminatorElement();
    this.specPath = always(['document', 'objects', 'Discriminator']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default DiscriminatorVisitor;
