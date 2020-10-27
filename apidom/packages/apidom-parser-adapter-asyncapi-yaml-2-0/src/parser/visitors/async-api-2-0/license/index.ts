import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const LicenseVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'License']),
  },
  init() {
    this.element = new this.namespace.elements.License();
  },
});

export default LicenseVisitor;
