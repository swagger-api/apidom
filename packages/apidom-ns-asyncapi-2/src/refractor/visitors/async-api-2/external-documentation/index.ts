import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ExternalDocumentationElement from '../../../../elements/ExternalDocumentation';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface ExternalDocumentationVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class ExternalDocumentationVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ExternalDocumentationElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'ExternalDocumentation']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: ExternalDocumentationVisitorOptions) {
    super(options);
    this.element = new ExternalDocumentationElement();
    this.specPath = always(['document', 'objects', 'ExternalDocumentation']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ExternalDocumentationVisitor;
