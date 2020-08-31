import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';

const $RefVisitor = stampit(PropertyVisitor, {
  props: {
    name: '$ref',
    type: 'String',
  },
});

export default $RefVisitor;
