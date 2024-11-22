import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MediaTypeElement from '../../../../elements/MediaType.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MediaTypeVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MediaTypeVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MediaTypeElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'MediaType']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: MediaTypeVisitorOptions) {
    super(options);
    this.element = new MediaTypeElement();
    this.specPath = always(['document', 'objects', 'MediaType']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default MediaTypeVisitor;
