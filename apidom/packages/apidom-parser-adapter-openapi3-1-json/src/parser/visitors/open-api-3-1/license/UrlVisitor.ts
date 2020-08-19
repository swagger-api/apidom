import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';

const UrlVisitor = stampit(PropertyVisitor, {
  props: {
    name: 'url',
    type: 'String',
  },
});

export default UrlVisitor;
