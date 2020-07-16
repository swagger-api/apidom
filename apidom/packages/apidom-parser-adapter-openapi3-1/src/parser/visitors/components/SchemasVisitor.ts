import stampit from 'stampit';
import SpecificationVisitor from '../SpecificationVisitor';
import { visit, BREAK } from '../../visitor';

const SchemasVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('schemas'),
      );
    },

    object(objectNode) {
      const schemasElement = new this.namespace.elements.Object();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);

      objectNode.properties.forEach((propertyNode) => {
        schemasElement.content.push(
          this.mapPropertyNodeToMemberElement(['document', 'objects', 'Schema'], propertyNode),
        );
      });

      visit(objectNode.comments, commentVisitor);
      schemasElement.meta.set('comments', commentVisitor.element);
      schemasElement.classes.push('schemas');

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, schemasElement),
      );

      return BREAK;
    },
  },
});

export default SchemasVisitor;
