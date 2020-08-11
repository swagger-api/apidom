import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isOpenApiExtension } from '../../../predicates';

const ServerVariableVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String(keyNode.value),
      );
    },

    object(objectNode) {
      const serverVariableElement = new this.namespace.elements.ServerVariable();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const supportedProps = ['enum', 'default', 'description'];

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        if (supportedProps.includes(propertyNode.key.value)) {
          serverVariableElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'ServerVariable', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          serverVariableElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, serverVariableElement),
      );

      return BREAK;
    },
  },
});

export default ServerVariableVisitor;
