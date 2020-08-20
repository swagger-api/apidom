import stampit from 'stampit';
import { BREAK } from '..';
import { isAsyncApiExtension } from '../../predicates';
import SpecificationVisitor from '../SpecificationVisitor';

const AsyncApi2_0Visitor = stampit(SpecificationVisitor, {
  methods: {
    object(objectNode) {
      const asyncApi2_0Element = new this.namespace.elements.AsyncApi2_0();

      const supportedProps = ['asyncapi', 'id', 'info', 'components'];

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        // @ts-ignore
        if (supportedProps.includes(propertyNode.key.value)) {
          asyncApi2_0Element.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'AsyncApi', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isAsyncApiExtension({}, propertyNode)) {
          asyncApi2_0Element.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      this.element = this.maybeAddSourceMap(objectNode, asyncApi2_0Element);

      return BREAK;
    },
  },
});

export default AsyncApi2_0Visitor;
