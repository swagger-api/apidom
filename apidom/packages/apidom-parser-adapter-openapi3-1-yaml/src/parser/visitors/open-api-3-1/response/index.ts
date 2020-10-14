import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ResponseVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Response']),
  },
  init() {
    this.element = new this.namespace.elements.Response();
  },
});

export default ResponseVisitor;
