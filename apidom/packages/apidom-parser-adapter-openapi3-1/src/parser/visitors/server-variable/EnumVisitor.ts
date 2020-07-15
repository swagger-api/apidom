import stampit from 'stampit';
import SpecificationVisitor from '../SpecificationVisitor';
import { BREAK, visit } from '../../visitor';

const EnumVisitor = stampit(SpecificationVisitor, {
  methods: {
    property(propertyNode) {
      const arrayVisitor = this.retrieveVisitorInstance(['array']);
      const keyElement = new this.namespace.elements.String('enum');
      const { MemberElement } = this.namespace.elements.Element.prototype;

      visit(propertyNode.value, arrayVisitor);

      this.element = new MemberElement(
        this.maybeAddSourceMap(propertyNode.key, keyElement),
        this.maybeAddSourceMap(propertyNode.value, arrayVisitor.element),
      );

      return BREAK;
    },
  },
});

export default EnumVisitor;
