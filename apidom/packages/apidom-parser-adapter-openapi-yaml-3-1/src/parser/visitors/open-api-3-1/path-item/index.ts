import stampit from 'stampit';
import { always } from 'ramda';
import { YamlKeyValuePair } from 'apidom-ast';
import { isOperationElement } from 'apidom-ns-openapi-3-1';

import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const PathItemVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'PathItem']),
  },
  init() {
    this.element = new this.namespace.elements.PathItem();
  },
  methods: {
    keyValuePair(keyValuePairNode: YamlKeyValuePair) {
      // @ts-ignore
      const result = FixedFieldsYamlMappingVisitor.compose.methods.keyValuePair.call(
        this,
        keyValuePairNode,
      );

      const memberElement = this.element.last;

      if (!isOperationElement(memberElement.value)) {
        return result;
      }

      // decorate Operation element with HTTP method
      const { key: httpMethodElementCI, value: operationElement } = memberElement;
      const httpMethod = httpMethodElementCI.toValue().toUpperCase();
      const httpMethodElementCS = new this.namespace.elements.String(httpMethod);
      operationElement.setMetaProperty('httpMethod', httpMethodElementCS);

      return result;
    },
  },
});

export default PathItemVisitor;
