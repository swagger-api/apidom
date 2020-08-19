import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isOpenApiExtension } from '../../../predicates';

const ServerVisitor = stampit(SpecificationVisitor, {
  methods: {
    object(objectNode) {
      const serverElement = new this.namespace.elements.Server();
      const supportedProps = ['url', 'description', 'variables'];

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        if (supportedProps.includes(propertyNode.key.value)) {
          serverElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'Server', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          serverElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      this.element = this.maybeAddSourceMap(objectNode, serverElement);

      return BREAK;
    },
  },
});

export default ServerVisitor;
