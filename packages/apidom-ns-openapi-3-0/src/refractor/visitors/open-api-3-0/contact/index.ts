import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ContactElement from '../../../../elements/Contact';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class ContactVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ContactElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Contact']>;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ContactElement();
    this.specPath = always(['document', 'objects', 'Contact']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ContactVisitor;
