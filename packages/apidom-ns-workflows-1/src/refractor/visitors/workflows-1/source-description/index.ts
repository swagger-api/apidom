import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SourceDescriptionElement from '../../../../elements/SourceDescription.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface SourceDescriptionVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SourceDescriptionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SourceDescriptionElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'SourceDescription']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: SourceDescriptionVisitorOptions) {
    super(options);
    this.element = new SourceDescriptionElement();
    this.specPath = always(['document', 'objects', 'SourceDescription']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SourceDescriptionVisitor;
