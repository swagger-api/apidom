import stampit from 'stampit';
import { always } from 'ramda';

import RedisChannelBindingElement from '../../../../../../elements/bindings/redis/RedisChannelBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const RedisChannelBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'redis', 'ChannelBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new RedisChannelBindingElement();
  },
});

export default RedisChannelBindingVisitor;
