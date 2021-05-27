import stampit from 'stampit';
import { always } from 'ramda';

import HttpMessageBindingElement from '../../../../../../elements/bindings/http/HttpMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const HttpMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'HttpMessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new HttpMessageBindingElement();
  },
});

export default HttpMessageBindingVisitor;
