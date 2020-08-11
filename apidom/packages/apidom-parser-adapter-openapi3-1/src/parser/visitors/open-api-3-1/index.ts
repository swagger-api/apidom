import stampit from 'stampit';
import { BREAK } from '..';
import { isOpenApiExtension } from '../../predicates';
import SpecificationVisitor from '../SpecificationVisitor';

const OpenApi3_1Visitor = stampit(SpecificationVisitor, {
  methods: {
    object(objectNode) {
      this.element = new this.namespace.elements.OpenApi3_1();

      const supportedProps = ['openapi', 'info', 'servers', 'components'];

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        // @ts-ignore
        if (supportedProps.includes(propertyNode.key.value)) {
          this.element.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'OpenApi', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          this.element.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      return BREAK;
    },
  },
});

export default OpenApi3_1Visitor;
