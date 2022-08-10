import stampit from 'stampit';
import { always } from 'ramda';

import MediaElement from '../../../../elements/Media';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const MediaVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Media']),
  },
  init() {
    this.element = new MediaElement();
  },
});

export default MediaVisitor;
