import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MediaElement from '../../../../elements/Media.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MediaVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
export const MediaVisitorBase = Mixin(FixedFieldsVisitor, FallbackVisitor);

/**
 * @public
 */
class MediaVisitor extends MediaVisitorBase {
  public declare readonly element: MediaElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Media']>;

  constructor(options: MediaVisitorOptions) {
    super(options);
    this.element = new MediaElement();
    this.specPath = always(['document', 'objects', 'Media']);
  }
}

export default MediaVisitor;
