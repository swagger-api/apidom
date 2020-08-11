import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';

const VariablesVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('variables'),
      );
    },

    object(objectNode) {
      const variablesElement = new this.namespace.elements.Object();
      const { MemberElement } = this.namespace.elements.Element.prototype;

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

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, variablesElement),
      );

      return BREAK;
    },
  },
});

export default VariablesVisitor;
