import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';

const DefaultVisitor = stampit(PropertyVisitor, {
  props: {
    name: 'default',
    type: 'String',
  },
});

export default DefaultVisitor;
