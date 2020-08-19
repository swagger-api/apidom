import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';

const TermsOfServiceVisitor = stampit(PropertyVisitor, {
  props: {
    name: 'termsOfService',
    type: 'String',
  },
});

export default TermsOfServiceVisitor;
