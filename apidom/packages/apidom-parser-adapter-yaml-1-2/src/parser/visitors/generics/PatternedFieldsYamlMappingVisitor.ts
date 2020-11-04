import stampit from 'stampit';
import { F as stubFalse } from 'ramda';
import { noop } from 'ramda-adjunct';
import { YamlKeyValuePair, YamlMapping } from 'apidom-ast';

import SpecificationVisitor from '../SpecificationVisitor';
import { visit } from '..';

const PatternedFieldsYamlMappingVisitor = stampit(SpecificationVisitor, {
  props: {
    fieldPatternPredicate: stubFalse,
    specPath: noop,
    ignoredFields: [],
    keyMap: {
      // @ts-ignore
      [YamlMapping.type]: ['content'],
    },
    canSupportSpecificationExtensions: false,
    specificationExtensionPredicate: stubFalse,
  },
  init({
    // @ts-ignore
    specPath = this.specPath,
    // @ts-ignore
    fieldPatternPredicate = this.fieldPatternPredicate,
    // @ts-ignore
    ignoredFields = this.ignoredFields,
    // @ts-ignore
    canSupportSpecificationExtensions = this.canSupportSpecificationExtensions,
    // @ts-ignore
    specificationExtensionPredicate = this.specificationExtensionPredicate,
  } = {}) {
    this.specPath = specPath;
    this.fieldPatternPredicate = fieldPatternPredicate;
    this.ignoredFields = ignoredFields;
    this.canSupportSpecificationExtensions = canSupportSpecificationExtensions;
    this.specificationExtensionPredicate = specificationExtensionPredicate;
  },
  methods: {
    mapping(mappingNode: YamlMapping) {
      this.maybeAddSourceMap(mappingNode, this.element);
    },

    keyValuePair(keyValuePairNode: YamlKeyValuePair) {
      const { key: keyNode, value: valueNode } = keyValuePairNode;
      const keyName = keyNode.content;
      const { MemberElement } = this.namespace.elements.Element.prototype;

      if (
        this.canSupportSpecificationExtensions &&
        this.specificationExtensionPredicate(keyValuePairNode)
      ) {
        const visitor = this.retrieveVisitorInstance(['document', 'extension']);
        visit(keyValuePairNode, visitor);
        this.element.content.push(visitor.element);
      } else if (!this.ignoredFields.includes(keyName) && this.fieldPatternPredicate(keyName)) {
        const specPath = this.specPath(valueNode);
        const visitor = this.retrieveVisitorInstance(specPath);
        const keyElement = new this.namespace.elements.String(keyName);

        visit(valueNode, visitor);

        const memberElement = this.maybeAddSourceMap(
          keyValuePairNode,
          new MemberElement(this.maybeAddSourceMap(keyNode, keyElement), visitor.element),
        );
        memberElement.classes.push('patternedField');

        this.element.content.push(memberElement);
      } else if (!this.ignoredFields.includes(keyName)) {
        const keyElement = new this.namespace.elements.String(keyName);
        const memberElement = this.maybeAddSourceMap(
          keyValuePairNode,
          new MemberElement(
            this.maybeAddSourceMap(keyNode, keyElement),
            this.nodeToElement(['kind'], valueNode),
          ),
        );
        this.element.content.push(memberElement);
      }
    },
  },
});

export default PatternedFieldsYamlMappingVisitor;
