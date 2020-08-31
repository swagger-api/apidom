import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isAsyncApiExtension } from '../../../predicates';

const ComponentsVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('components'),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      const componentsElement = new this.namespace.elements.Components();
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
        } else if (isAsyncApiExtension({}, propertyNode)) {
          componentsElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      this.element.value = this.maybeAddSourceMap(objectNode, componentsElement);

      return BREAK;
    },
  },
});

export default ComponentsVisitor;
