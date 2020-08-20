import stampit from 'stampit';
import SpecificationVisitor from '../SpecificationVisitor';

const IdentifierVisitor = stampit(SpecificationVisitor, {
  methods: {
    property(propertyNode) {
      const keyElement = new this.namespace.elements.String(propertyNode.key.value);
      const identifierElement = new this.namespace.elements.Identifier(propertyNode.value.value);
      const { MemberElement } = this.namespace.elements.Element.prototype;

      this.element = new MemberElement(
        this.maybeAddSourceMap(propertyNode.key, keyElement),
        this.maybeAddSourceMap(propertyNode.value, identifierElement),
      );
    },
  },
});

export default IdentifierVisitor;
