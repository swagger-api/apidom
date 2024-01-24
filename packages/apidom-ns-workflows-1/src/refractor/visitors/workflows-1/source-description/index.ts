import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import SourceDescriptionElement from '../../../../elements/SourceDescription';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

class SourceDescriptionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: SourceDescriptionElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'SourceDescription']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new SourceDescriptionElement();
    this.specPath = always(['document', 'objects', 'SourceDescription']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default SourceDescriptionVisitor;
