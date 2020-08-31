import stampit from 'stampit';
import SpecificationVisitor from '../../SpecificationVisitor';
import { BREAK } from '../..';

const SchemasVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('schemas'),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      const schemasElement = new this.namespace.elements.Object();

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        schemasElement.content.push(
          this.mapPropertyNodeToMemberElement(['document', 'objects', 'Schema'], propertyNode),
        );
      });

      schemasElement.classes.push('schemas');

      this.element.value = this.maybeAddSourceMap(objectNode, schemasElement);

      return BREAK;
    },
  },
});

export default SchemasVisitor;
