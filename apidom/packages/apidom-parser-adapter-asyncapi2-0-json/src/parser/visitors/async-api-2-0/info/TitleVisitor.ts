import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';

const TitleVisitor = stampit(PropertyVisitor, {
  props: {
    name: 'title',
    type: 'String',
  },
});

export default TitleVisitor;
