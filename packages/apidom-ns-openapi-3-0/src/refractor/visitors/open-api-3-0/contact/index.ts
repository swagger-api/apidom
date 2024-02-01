import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ContactElement from '../../../../elements/Contact';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface ContactVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class ContactVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ContactElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Contact']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: ContactVisitorOptions) {
    super(options);
    this.element = new ContactElement();
    this.specPath = always(['document', 'objects', 'Contact']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ContactVisitor;
