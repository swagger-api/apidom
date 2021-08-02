import stampit from 'stampit';
import { always } from 'ramda';

import RedisServerBindingElement from '../../../../../../elements/bindings/redis/RedisServerBinding';
import FallbackVisitor from '../../../../FallbackVisitor';
import FixedFieldsVisitor from '../../../../generics/FixedFieldsVisitor';

const RedisServerBindingVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'bindings', 'redis', 'ServerBinding']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new RedisServerBindingElement();
  },
});

export default RedisServerBindingVisitor;
