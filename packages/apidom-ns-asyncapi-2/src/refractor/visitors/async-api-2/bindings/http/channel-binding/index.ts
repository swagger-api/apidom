import stampit from 'stampit';
import { always } from 'ramda';

import HttpChannelBindingElement from '../../../../../../elements/bindings/http/HttpChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const HttpChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'http', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new HttpChannelBindingElement();
    this.element.classes.push('channel-binding');
  },
});

export default HttpChannelBindingVisitor;
