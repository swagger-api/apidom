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
class MediaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MediaElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Media']>;

  constructor(options: MediaVisitorOptions) {
    super(options);
    this.element = new MediaElement();
    this.specPath = always(['document', 'objects', 'Media']);
  }
}

export default MediaVisitor;
