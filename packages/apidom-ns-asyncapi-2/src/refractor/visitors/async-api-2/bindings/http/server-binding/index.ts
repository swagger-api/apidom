import stampit from 'stampit';
import { always } from 'ramda';

import HttpServerBindingElement from '../../../../../../elements/bindings/http/HttpServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const HttpServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'http', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new HttpServerBindingElement();
  },
});

export default HttpServerBindingVisitor;
