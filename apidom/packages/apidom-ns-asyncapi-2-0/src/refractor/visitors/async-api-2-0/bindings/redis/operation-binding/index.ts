import stampit from 'stampit';
import { always } from 'ramda';

import RedisOperationBindingElement from '../../../../../../elements/bindings/redis/RedisOperationBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const RedisOperationBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'redis', 'OperationBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new RedisOperationBindingElement();
  },
});

export default RedisOperationBindingVisitor;
