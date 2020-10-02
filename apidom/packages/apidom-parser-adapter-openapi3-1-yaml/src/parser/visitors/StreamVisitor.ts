import stampit from 'stampit';
import { Literal, Error, YamlDocument } from 'apidom-ast';

import SpecificationVisitor from './SpecificationVisitor';

const StreamVisitor = stampit(SpecificationVisitor, {
  props: {
    firstDocumentVisited: false,
  },
  methods: {
    literal(literalNode: Literal) {
      if (literalNode.isMissing) {
        const element = this.nodeToElement(['error'], literalNode);
        this.element.content.push(element);
      }
    },

    document(documentNode: YamlDocument) {
      if (this.firstDocumentVisited) {
        const message =
          'Only first document within YAML stream will be used. Rest of them will be discarded.';
        const annotationElement = new this.namespace.elements.Annotation(message);
        annotationElement.classes.push('warning');
        this.element.content.push(annotationElement);
        return false;
      }

      const element = this.nodeToElement(['document'], documentNode);
      this.element.content.push(element);
      this.firstDocumentVisited = true;
      return undefined;
    },

    error(errorNode: Error) {
      const element = this.nodeToElement(['error'], errorNode);
      this.element.content.push(element);
    },
  },
});

export default StreamVisitor;
