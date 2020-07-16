import stampit from 'stampit';
import { visit, BREAK } from '../visitor';
import { isOpenApiExtension } from '../predicates';
import SpecificationVisitor from './SpecificationVisitor';

const OpenApi3_1Visitor = stampit(SpecificationVisitor, {
  methods: {
    object(objectNode) {
      this.element = new this.namespace.elements.OpenApi3_1();
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);
      const supportedProps = ['openapi', 'info', 'servers', 'components'];

      objectNode.properties.forEach((propertyNode) => {
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

      visit(objectNode.comments, commentVisitor);
      this.element.meta.set('comments', commentVisitor.element);

      return BREAK;
    },
  },
});

export default OpenApi3_1Visitor;
