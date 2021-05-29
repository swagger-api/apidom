import stampit from 'stampit';
import { always } from 'ramda';

import RedisMessageBindingElement from '../../../../../../elements/bindings/redis/RedisMessageBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const RedisMessageBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'redis', 'MessageBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new RedisMessageBindingElement();
  },
});

export default RedisMessageBindingVisitor;
