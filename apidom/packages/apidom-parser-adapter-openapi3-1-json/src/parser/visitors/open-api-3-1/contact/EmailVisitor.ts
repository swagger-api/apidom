import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';

const EmailVisitor = stampit(PropertyVisitor, {
  props: {
    name: 'email',
    type: 'String',
  },
});

export default EmailVisitor;
