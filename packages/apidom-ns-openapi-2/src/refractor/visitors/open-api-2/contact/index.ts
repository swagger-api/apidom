import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ContactElement from '../../../../elements/Contact.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ContactVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ContactVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ContactElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Contact']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ContactVisitorOptions) {
    super(options);
    this.element = new ContactElement();
    this.specPath = always(['document', 'objects', 'Contact']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ContactVisitor;
