import stampit from 'stampit';
import { JsonObject } from 'apidom-ast';
import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';
import { isServerObject } from '../../predicates';

const ServersVisitor = stampit(SpecificationVisitor, {
  methods: {
    array(arrayNode) {
      const serverElements = arrayNode.items
        .filter(isServerObject({}))
        .map((objectNode: JsonObject) =>
          this.nodeToElement(['document', 'objects', 'Server'], objectNode),
        );

      const serversElement = new this.namespace.elements.Array(serverElements);
      serversElement.classes.push('servers');

      this.element = this.maybeAddSourceMap(arrayNode, serversElement);

      return BREAK;
    },
  },
});

export default ServersVisitor;
