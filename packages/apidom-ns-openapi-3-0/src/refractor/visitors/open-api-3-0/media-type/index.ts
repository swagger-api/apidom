import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MediaTypeElement from '../../../../elements/MediaType';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class MediaTypeVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MediaTypeElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'MediaType']>;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new MediaTypeElement();
    this.specPath = always(['document', 'objects', 'MediaType']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default MediaTypeVisitor;
