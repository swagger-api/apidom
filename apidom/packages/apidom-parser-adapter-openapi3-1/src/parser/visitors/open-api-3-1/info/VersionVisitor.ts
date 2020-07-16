import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';

const VersionVisitor = stampit(PropertyVisitor, {
  props: {
    name: 'version',
    type: 'String',
  },
});

export default VersionVisitor;
