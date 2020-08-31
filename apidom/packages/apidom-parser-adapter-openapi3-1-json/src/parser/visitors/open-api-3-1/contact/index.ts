import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isOpenApiExtension } from '../../../predicates';

const ContactVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('contact'),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      const contactElement = new this.namespace.elements.Contact();

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        if (['name', 'url', 'email'].includes(propertyNode.key.value)) {
          contactElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'Contact', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          contactElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      this.element.value = this.maybeAddSourceMap(objectNode, contactElement);

      return BREAK;
    },
  },
});

export default ContactVisitor;
