import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isOpenApiExtension } from '../../../predicates';

const ComponentsVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('components'),
      );
    },

    object(objectNode) {
      const componentsElement = new this.namespace.elements.Components();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const supportedProps = ['schemas'];

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        if (supportedProps.includes(propertyNode.key.value)) {
          componentsElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'Components', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          componentsElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, componentsElement),
      );

      return BREAK;
    },
  },
});

export default ComponentsVisitor;
