import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';

const IdentifierVisitor = stampit(PropertyVisitor, {
  props: {
    name: 'identifier',
    type: 'String',
  },
});

export default IdentifierVisitor;
