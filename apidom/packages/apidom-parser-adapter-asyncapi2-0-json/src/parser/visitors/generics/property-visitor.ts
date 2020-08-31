import stampit from 'stampit';
import { defaultTo } from 'ramda';
import SpecificationVisitor from '../SpecificationVisitor';
import { BREAK } from '..';

const PropertyVisitor = stampit(SpecificationVisitor, {
  props: {
    name: null,
    type: null,
  },
  methods: {
    property(propertyNode) {
      const name = defaultTo(propertyNode.key.value, this.name);
      const keyElement = new this.namespace.elements.String(name);
      const valueElement =
        this.type === null
          ? this.namespace.toElement(propertyNode.value.value) // type inference
          : new this.namespace.elements[this.type](propertyNode.value.value);
      const { MemberElement } = this.namespace.elements.Element.prototype;

      this.element = this.maybeAddSourceMap(
        propertyNode,
        new MemberElement(
          this.maybeAddSourceMap(propertyNode.key, keyElement),
          this.maybeAddSourceMap(propertyNode.value, valueElement),
        ),
      );

      return BREAK;
    },
  },
});

export default PropertyVisitor;
