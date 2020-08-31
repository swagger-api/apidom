import stampit from 'stampit';
import SpecificationVisitor from '../SpecificationVisitor';

const AsyncapiVisitor = stampit(SpecificationVisitor, {
  methods: {
    property(propertyNode) {
      const keyElement = new this.namespace.elements.String(propertyNode.key.value);
      const asyncapiElement = new this.namespace.elements.Asyncapi(propertyNode.value.value);
      const { MemberElement } = this.namespace.elements.Element.prototype;

      this.element = this.maybeAddSourceMap(
        propertyNode,
        new MemberElement(
          this.maybeAddSourceMap(propertyNode.key, keyElement),
          this.maybeAddSourceMap(propertyNode.value, asyncapiElement),
        ),
      );
    },
  },
});

export default AsyncapiVisitor;
