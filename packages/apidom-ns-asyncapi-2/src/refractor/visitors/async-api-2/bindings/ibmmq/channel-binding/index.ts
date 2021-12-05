import stampit from 'stampit';
import { always } from 'ramda';

import IbmmqChannelBindingElement from '../../../../../../elements/bindings/ibmmq/IbmmqChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const IbmmqChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'ibmmq', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new IbmmqChannelBindingElement();
    this.element.classes.push('channel-binding');
  },
});

export default IbmmqChannelBindingVisitor;
