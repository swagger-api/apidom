import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsVisitor from '../generics/FixedFieldsVisitor';
import FallbackVisitor from '../FallbackVisitor';
import JSONSchemaElement from '../../../elements/JSONSchema';

const JSONSchemaVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'JSONSchema']),
  },
  init() {
    this.element = new JSONSchemaElement();
  },
});

export default JSONSchemaVisitor;
