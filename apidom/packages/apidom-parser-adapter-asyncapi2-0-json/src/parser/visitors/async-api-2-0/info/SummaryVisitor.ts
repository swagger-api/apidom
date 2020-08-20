import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';

const DescriptionVisitor = stampit(PropertyVisitor, {
  props: {
    name: 'summary',
    type: 'String',
  },
});

export default DescriptionVisitor;
