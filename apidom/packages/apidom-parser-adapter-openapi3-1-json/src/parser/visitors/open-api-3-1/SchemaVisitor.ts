import stampit from 'stampit';
import { visit, BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';

const SchemaVisitor = stampit(SpecificationVisitor, {
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
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const objectVisitor = this.retrieveVisitorInstance(['object']);

      visit(objectNode, objectVisitor);

      const schemaElement = new this.namespace.elements.Schema(objectVisitor.element.content);

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, schemaElement),
      );

      return BREAK;
    },
  },
});

export default SchemaVisitor;
