import stampit from 'stampit';
import { test } from 'ramda';
import { isYamlMapping, JsonNode } from 'apidom-ast';
// @ts-ignore
import { isReferenceObject } from 'apidom-parser-adapter-asyncapi-json-2-0';

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
});

export default ParametersVisitor;
