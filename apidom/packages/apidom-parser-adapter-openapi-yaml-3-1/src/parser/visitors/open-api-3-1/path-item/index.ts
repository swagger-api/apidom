import stampit from 'stampit';
import { StringElement } from 'minim';
import { always } from 'ramda';
import { YamlMapping } from 'apidom-ast';
import { isOperationElement, OperationElement } from 'apidom-ns-openapi-3-1';

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
    mapping(mappingNode: YamlMapping) {
      // @ts-ignore
      const result = FixedFieldsYamlMappingVisitor.compose.methods.mapping.call(this, mappingNode);

      // decorate Operation elements with HTTP method
      this.element
        .filter(isOperationElement)
        .forEach((operationElement: OperationElement, httpMethodElementCI: StringElement) => {
          const httpMethod = httpMethodElementCI.toValue().toUpperCase();
          const httpMethodElementCS = new this.namespace.elements.String(httpMethod);
          operationElement.setMetaProperty('httpMethod', httpMethodElementCS);
        });

      return result;
    },
  },
});

export default PathItemVisitor;
