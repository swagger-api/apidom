import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MediaElement from '../../../../elements/Media';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface MediaVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class MediaVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: MediaElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Media']>;

  constructor(options: MediaVisitorOptions) {
    super(options);
    this.element = new MediaElement();
    this.specPath = always(['document', 'objects', 'Media']);
  }
}

export default MediaVisitor;
