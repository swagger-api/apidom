import stampit from 'stampit';
import { always } from 'ramda';

import MediaTypeElement from '../../../../elements/MediaType';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const MediaTypeVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'MediaType']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new MediaTypeElement();
  },
});

export default MediaTypeVisitor;
