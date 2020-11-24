import stampit from 'stampit';
import { YamlNode } from 'apidom-ast';

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
});

export default ParametersVisitor;
