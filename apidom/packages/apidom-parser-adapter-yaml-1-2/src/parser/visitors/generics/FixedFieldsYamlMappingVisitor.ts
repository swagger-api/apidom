import stampit from 'stampit';
import { F as stubFalse } from 'ramda';
import { noop } from 'ramda-adjunct';
import { YamlKeyValuePair, YamlMapping } from 'apidom-ast';

import SpecificationVisitor from '../SpecificationVisitor';
import { visit } from '../index';

const FixedFieldsYamlMappingVisitor = stampit(SpecificationVisitor, {
  props: {
    specPath: noop,
    ignoredFields: [],
    keyMap: {
      // @ts-ignore
      [YamlMapping.type]: ['content'],
    },
    canSupportSpecificationExtensions: true,
    specificationExtensionPredicate: stubFalse,
  },
  init({
    // @ts-ignore
    specPath = this.specPath,
    // @ts-ignore
    ignoredFields = this.ignoredFields,
    // @ts-ignore
    canSupportSpecificationExtensions = this.canSupportSpecificationExtensions,
    // @ts-ignore
    specificationExtensionPredicate = this.specificationExtensionPredicate,
  } = {}) {
    this.specPath = specPath;
    this.ignoredFields = ignoredFields;
    this.canSupportSpecificationExtensions = canSupportSpecificationExtensions;
    this.specificationExtensionPredicate = specificationExtensionPredicate;
  },
  methods: {
    mapping(mappingNode: YamlMapping) {
      this.maybeAddSourceMap(mappingNode, this.element);
    },

    keyValuePair(keyValuePairNode: YamlKeyValuePair) {
      const specPath = this.specPath(keyValuePairNode);
      const fields = this.retrieveFixedFields(specPath);
      const { MemberElement } = this.namespace.elements.Element.prototype;

      const { key: keyNode, value: valueNode } = keyValuePairNode;
      const keyName = keyNode.content;

      if (fields.includes(keyName) && !this.ignoredFields.includes(keyName)) {
        const visitor = this.retrieveVisitorInstance([...specPath, 'fixedFields', keyName]);
        const keyElement = new this.namespace.elements.String(keyName);

        visit(valueNode, visitor);

        const memberElement = this.maybeAddSourceMap(
          keyValuePairNode,
          new MemberElement(this.maybeAddSourceMap(keyNode, keyElement), visitor.element),
        );
        memberElement.classes.push('fixedField');
        this.element.content.push(memberElement);
      } else if (
        this.canSupportSpecificationExtensions &&
        this.specificationExtensionPredicate(keyValuePairNode)
      ) {
        const visitor = this.retrieveVisitorInstance(['document', 'extension']);
        visit(keyValuePairNode, visitor);
        this.element.content.push(visitor.element);
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

export default FixedFieldsYamlMappingVisitor;
