import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ContactVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Contact']),
  },
  init() {
    this.element = new this.namespace.elements.Contact();
  },
});

export default ContactVisitor;
