import stampit from 'stampit';
import { isYamlMapping } from 'apidom-ast';

import MapYamlMappingVisitor from '../../generics/MapYamlMappingVisitor';
import { isReferenceObject } from '../../../predicates';
import { KindVisitor } from '../../generics';

const CallbacksVisitor = stampit(KindVisitor, MapYamlMappingVisitor, {
  props: {
    specPath: (node: unknown) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceObject({}, node)
        ? ['document', 'objects', 'Reference']
        : isYamlMapping(node)
        ? ['document', 'objects', 'Callback']
        : ['kind'];
    },
  },
  init() {
    this.element = new this.namespace.elements.Object();
    this.element.classes.push('callbacks');
  },
});

export default CallbacksVisitor;
