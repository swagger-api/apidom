import stampit from 'stampit';
import { test } from 'ramda';
import { isYamlMapping, JsonNode, YamlMapping } from 'apidom-ast';
import { isReferenceElement, ReferenceElement } from 'apidom-ns-openapi-3-1';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-yaml-1-2';

import { isReferenceObject } from '../../../predicates';
import PatternedFieldsYamlMappingVisitor from '../../generics/PatternedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ParametersVisitor = stampit(KindVisitor, PatternedFieldsYamlMappingVisitor, {
  props: {
    specPath: (node: JsonNode) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isYamlMapping(node)
        ? ['document', 'objects', 'Parameter']
        : ['value'];
    },
    fieldPatternPredicate: test(/^[A-Za-z0-9_\\-]+$/),
  },
  init() {
    this.element = new this.namespace.elements.Parameters();
  },
  methods: {
    mapping(mappingNode: YamlMapping) {
      // @ts-ignore
      const result = PatternedFieldsYamlMappingVisitor.compose.methods.mapping.call(
        this,
        mappingNode,
      );

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        appendMetadata(['json-reference-for-parameter'], referenceElement);
      });

      return result;
    },
  },
});

export default ParametersVisitor;
