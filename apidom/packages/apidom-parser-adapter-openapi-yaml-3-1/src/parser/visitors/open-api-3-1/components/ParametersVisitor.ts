import stampit from 'stampit';
import { YamlMapping, YamlNode } from 'apidom-ast';
import { isReferenceElement, ReferenceElement } from 'apidom-ns-openapi-3-1';

import MapYamlMappingVisitor from '../../generics/MapYamlMappingVisitor';
import { KindVisitor } from '../../generics';
import { isReferenceObject, isParameterObject } from '../../../predicates';

const ParametersVisitor = stampit(KindVisitor, MapYamlMappingVisitor, {
  props: {
    specPath: (node: YamlNode) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isParameterObject({}, node)
        ? ['document', 'objects', 'Parameter']
        : ['value'];
    },
  },
  init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('parameters');
  },
  methods: {
    mapping(mappingNode: YamlMapping) {
      const result = MapYamlMappingVisitor.compose.methods.mapping.call(this, mappingNode);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'parameter');
      });

      return result;
    },
  },
});

export default ParametersVisitor;
