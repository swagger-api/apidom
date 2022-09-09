import stampit from 'stampit';
import { always } from 'ramda';
import { TagElement } from '@swagger-api/apidom-ns-openapi-3-0';

import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const TagVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Tag']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new TagElement();
  },
});

export default TagVisitor;
