import stampit from 'stampit';
import { Literal, Error, YamlDocument, YamlComment } from 'apidom-ast';

import SpecificationVisitor from './SpecificationVisitor';

const StreamVisitor = stampit(SpecificationVisitor, {
  props: {
    processedDocumentCount: 0,
  },
  methods: {
    literal(literalNode: Literal) {
      if (literalNode.isMissing) {
        const element = this.nodeToElement(['error'], literalNode);
        this.element.content.push(element);
      }
    },

    comment(commentNode: YamlComment) {
      if (this.processedDocumentCount >= 1) {
        return false;
      }

      const commentElement = new this.namespace.elements.Comment(commentNode.content);

      this.element.content.push(commentElement);
      return undefined;
    },

    document(documentNode: YamlDocument) {
      if (this.processedDocumentCount === 1) {
        const message =
          'Only first document within YAML stream will be used. Rest of them will be discarded.';
        const annotationElement = new this.namespace.elements.Annotation(message);
        annotationElement.classes.push('warning');
        this.element.content.push(annotationElement);
      }

      if (this.processedDocumentCount >= 1) {
        return false;
      }

      const element = this.nodeToElement(['document'], documentNode);
      this.element.content.push(element);
      this.processedDocumentCount += 1;
      return undefined;
    },

    error(errorNode: Error) {
      const element = this.nodeToElement(['error'], errorNode);
      this.element.content.push(element);
    },
  },
});

export default StreamVisitor;
