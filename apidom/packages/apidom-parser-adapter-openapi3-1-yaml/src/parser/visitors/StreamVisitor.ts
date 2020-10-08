import stampit from 'stampit';
import { Literal, Error, YamlDocument, YamlComment } from 'apidom-ast';

import { visit, BREAK } from '.';
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
      // we're only interested of stream comments before the first document
      const shouldSkipVisitingMoreDocuments = this.processedDocumentCount >= 1;

      if (shouldSkipVisitingMoreDocuments) {
        return false;
      }

      const commentElement = new this.namespace.elements.Comment(commentNode.content);
      this.element.content.push(commentElement);
      return undefined;
    },

    document(documentNode: YamlDocument) {
      // we're only interested in first document
      const shouldWarnAboutMoreDocuments = this.processedDocumentCount === 1;
      const shouldSkipVisitingMoreDocuments = this.processedDocumentCount >= 1;

      if (shouldWarnAboutMoreDocuments) {
        const message =
          'Only first document within YAML stream will be used. Rest will be discarded.';
        const annotationElement = new this.namespace.elements.Annotation(message);
        annotationElement.classes.push('warning');
        this.element.content.push(annotationElement);
      }

      if (shouldSkipVisitingMoreDocuments) {
        return BREAK;
      }

      const documentVisitor = this.retrieveVisitorInstance(['document']);
      visit(documentNode, documentVisitor, {
        // @ts-ignore
        state: {
          element: this.element,
        },
      });

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
