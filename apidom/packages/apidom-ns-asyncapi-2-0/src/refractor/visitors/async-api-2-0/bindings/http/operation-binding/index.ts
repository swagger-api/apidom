import stampit from 'stampit';
import { always } from 'ramda';

import HttpOperationBindingElement from '../../../../../../elements/bindings/http/HttpOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const HttpOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'http', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new HttpOperationBindingElement();
  },
});

export default HttpOperationBindingVisitor;
