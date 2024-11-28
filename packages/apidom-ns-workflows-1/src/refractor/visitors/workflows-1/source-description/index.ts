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
  declare public readonly element: SourceDescriptionElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'SourceDescription']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: SourceDescriptionVisitorOptions) {
    super(options);
    this.element = new SourceDescriptionElement();
    this.specPath = always(['document', 'objects', 'SourceDescription']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SourceDescriptionVisitor;
