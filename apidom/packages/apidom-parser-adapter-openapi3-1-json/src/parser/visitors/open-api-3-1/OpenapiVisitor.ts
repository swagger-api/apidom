import stampit from 'stampit';
import SpecificationVisitor from '../SpecificationVisitor';

const OpenapiVisitor = stampit(SpecificationVisitor, {
  methods: {
    property(propertyNode) {
      const keyElement = new this.namespace.elements.String(propertyNode.key.value);
      const openapiElement = new this.namespace.elements.Openapi(propertyNode.value.value);
      const { MemberElement } = this.namespace.elements.Element.prototype;

      this.element = this.maybeAddSourceMap(
        propertyNode,
        new MemberElement(
          this.maybeAddSourceMap(propertyNode.key, keyElement),
          this.maybeAddSourceMap(propertyNode.value, openapiElement),
        ),
      );
    },
  },
});

export default OpenapiVisitor;
