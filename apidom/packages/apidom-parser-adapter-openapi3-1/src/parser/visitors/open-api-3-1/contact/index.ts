import stampit from 'stampit';
import { visit, BREAK } from '../../../visitor';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isOpenApiExtension } from '../../../predicates';

const ContactVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('contact'),
      );
    },

    object(objectNode) {
      const contactElement = new this.namespace.elements.Contact();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);

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

      visit(objectNode.comments, commentVisitor);
      contactElement.meta.set('comments', commentVisitor.element);

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, contactElement),
      );

      return BREAK;
    },
  },
});

export default ContactVisitor;
