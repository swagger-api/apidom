import stampit from 'stampit';
import { BREAK } from '..';
import { isOpenApiExtension } from '../../predicates';
import SpecificationVisitor from '../SpecificationVisitor';

const OpenApi3_1Visitor = stampit(SpecificationVisitor, {
  methods: {
    object(objectNode) {
      const openApi3_1Element = new this.namespace.elements.OpenApi3_1();

      const supportedProps = ['openapi', 'info', 'servers', 'components', 'paths'];

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        // @ts-ignore
        if (supportedProps.includes(propertyNode.key.value)) {
          openApi3_1Element.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'OpenApi', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          openApi3_1Element.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      this.element = this.maybeAddSourceMap(objectNode, openApi3_1Element);

      return BREAK;
    },
  },
});

export default OpenApi3_1Visitor;
