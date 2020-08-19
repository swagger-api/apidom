import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';

const NameVisitor = stampit(PropertyVisitor, {
  props: {
    name: 'name',
    type: 'String',
  },
});

export default NameVisitor;
