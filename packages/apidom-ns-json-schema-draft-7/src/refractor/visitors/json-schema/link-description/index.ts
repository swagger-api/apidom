import stampit from 'stampit';
import { always } from 'ramda';
import { FixedFieldsVisitor, FallbackVisitor } from '@swagger-api/apidom-ns-json-schema-draft-6';

import LinkDescriptionElement from '../../../../elements/LinkDescription';

const LinkDescriptionVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'LinkDescription']),
  },
  init() {
    this.element = new LinkDescriptionElement();
  },
});

export default LinkDescriptionVisitor;
