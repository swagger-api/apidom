import stampit from 'stampit';
import { visit, BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';

const SchemaVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String(keyNode.value),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      const objectVisitor = this.retrieveVisitorInstance(['object']);

      visit(objectNode, objectVisitor);

      const schemaElement = new this.namespace.elements.Schema(objectVisitor.element.content);

      this.element.value = this.maybeAddSourceMap(objectNode, schemaElement);

      return BREAK;
    },
  },
});

export default SchemaVisitor;
