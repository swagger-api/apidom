import stampit from 'stampit';
import { JsonObject, isJsonObject } from 'apidom-ast';
import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';

const SecurityVisitor = stampit(SpecificationVisitor, {
  methods: {
    array(arrayNode) {
      const securityRequirementElements = arrayNode.items
        .filter(isJsonObject)
        .map((objectNode: JsonObject) =>
          this.nodeToElement(['document', 'objects', 'SecurityRequirement'], objectNode),
        );

      const securitiesElement = new this.namespace.elements.Array(securityRequirementElements);
      securitiesElement.classes.push('security');

      this.element = this.maybeAddSourceMap(arrayNode, securitiesElement);

      return BREAK;
    },
  },
});

export default SecurityVisitor;
