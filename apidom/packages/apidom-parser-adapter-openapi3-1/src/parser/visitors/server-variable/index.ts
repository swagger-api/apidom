import stampit from 'stampit';
import { visit, BREAK } from '../../visitor';
import SpecificationVisitor from '../SpecificationVisitor';
import { isOpenApiExtension } from '../../predicates';

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
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const supportedProps = ['enum', 'default', 'description'];

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

      visit(objectNode.comments, commentVisitor);
      serverVariableElement.meta.set('comments', commentVisitor.element);

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, serverVariableElement),
      );

      return BREAK;
    },
  },
});

export default ServerVariableVisitor;
