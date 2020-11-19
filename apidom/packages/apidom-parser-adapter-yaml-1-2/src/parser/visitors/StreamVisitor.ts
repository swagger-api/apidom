import stampit from 'stampit';
import {
  Literal,
  Error,
  YamlDocument,
  YamlComment,
  YamlStream,
  YamlMapping,
  YamlSequence,
  YamlKeyValuePair,
} from 'apidom-ast';

import { visit, BREAK } from './index';
import SpecificationVisitor from './SpecificationVisitor';

const StreamVisitor = stampit(SpecificationVisitor, {
  props: {
    processedDocumentCount: 0,
    keyMap: {
      // @ts-ignore
      [YamlStream.type]: ['children'],
      // @ts-ignore
      [YamlDocument.type]: ['children'],
      // @ts-ignore
      [YamlMapping.type]: ['children'],
      // @ts-ignore
      [YamlSequence.type]: ['children'],
      // @ts-ignore
      [YamlKeyValuePair.type]: ['children'],
      // @ts-ignore
      [Error.type]: ['children'],
    },
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

      const commentElement = this.nodeToElement(['comment'], commentNode);
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
