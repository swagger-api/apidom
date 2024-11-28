import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ExternalDocumentationElement from '../../../../elements/ExternalDocumentation.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ExternalDocumentationVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ExternalDocumentationVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ExternalDocumentationElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'ExternalDocumentation']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ExternalDocumentationVisitorOptions) {
    super(options);
    this.element = new ExternalDocumentationElement();
    this.specPath = always(['document', 'objects', 'ExternalDocumentation']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ExternalDocumentationVisitor;
