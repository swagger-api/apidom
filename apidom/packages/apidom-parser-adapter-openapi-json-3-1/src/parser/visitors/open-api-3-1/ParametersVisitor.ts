import stampit from 'stampit';
import { JsonNode } from 'apidom-ast';
// @ts-ignore
import { appendMetadata, SpecificationVisitor, BREAK } from 'apidom-parser-adapter-json';

import { isParameterObject, isReferenceObject } from '../../predicates';
import { ValueVisitor } from '../generics';

const ParametersVisitor = stampit(ValueVisitor, SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Array();
    appendMetadata(['parameters'], this.element);
  },
  methods: {
    array(arrayNode) {
      arrayNode.items.forEach(<T extends JsonNode>(item: T): void => {
        if (isReferenceObject({}, item)) {
          const referenceElement = this.nodeToElement(['document', 'objects', 'Reference'], item);
          appendMetadata(['openapi-reference-for-parameter'], referenceElement);
          this.element.push(referenceElement);
        } else if (isParameterObject({}, item)) {
          const parameterElement = this.nodeToElement(['document', 'objects', 'Parameter'], item);
          this.element.push(parameterElement);
        } else {
          const element = this.nodeToElement(['value'], item);
          this.element.push(element);
        }
      });

      this.maybeAddSourceMap(arrayNode, this.element);

      return BREAK;
    },
  },
});

export default ParametersVisitor;
