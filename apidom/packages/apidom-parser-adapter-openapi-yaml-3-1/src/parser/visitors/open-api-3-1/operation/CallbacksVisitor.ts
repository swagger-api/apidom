import stampit from 'stampit';
import { isYamlMapping, YamlMapping } from 'apidom-ast';
// @ts-ignore
import { appendMetadata } from 'apidom-parser-adapter-yaml-1-2';
import { isReferenceElement, ReferenceElement } from 'apidom-ns-openapi-3-1';

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
    appendMetadata(['callbacks'], this.element);
  },
  methods: {
    mapping(mappingNode: YamlMapping) {
      const result = MapYamlMappingVisitor.compose.methods.mapping.call(this, mappingNode);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'callback');
      });

      return result;
    },
  },
});

export default CallbacksVisitor;
