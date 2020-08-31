import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';

const VariablesVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('variables'),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      const variablesElement = new this.namespace.elements.Object();

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        variablesElement.content.push(
          this.mapPropertyNodeToMemberElement(
            ['document', 'objects', 'ServerVariable'],
            propertyNode,
          ),
        );
      });

      variablesElement.classes.push('variables');

      this.element.value = this.maybeAddSourceMap(objectNode, variablesElement);

      return BREAK;
    },
  },
});

export default VariablesVisitor;
