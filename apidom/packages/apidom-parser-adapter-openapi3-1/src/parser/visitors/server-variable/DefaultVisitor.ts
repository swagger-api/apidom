import stampit from 'stampit';
import SpecificationVisitor from '../SpecificationVisitor';
import { BREAK } from '../../visitor';

const DefaultVisitor = stampit(SpecificationVisitor, {
  methods: {
    property(propertyNode) {
      const keyElement = new this.namespace.elements.String(propertyNode.key.value);
      const valueElement = new this.namespace.elements.String(propertyNode.value.value);
      const { MemberElement } = this.namespace.elements.Element.prototype;

      this.element = new MemberElement(
        this.maybeAddSourceMap(propertyNode.key, keyElement),
        this.maybeAddSourceMap(propertyNode.value, valueElement),
      );

      return BREAK;
    },
  },
});

export default DefaultVisitor;
