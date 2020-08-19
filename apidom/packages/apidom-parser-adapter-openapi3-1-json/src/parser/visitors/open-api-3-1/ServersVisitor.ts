import stampit from 'stampit';
import { JsonObject } from 'apidom-ast';
import { visit, BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';

const ServersVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('servers'),
      );
    },

    array(arrayNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const serverElements = arrayNode.items
        // @ts-ignore
        .filter((jsonNode) => jsonNode.type === JsonObject.type)
        .map((objectNode: JsonObject) => {
          const serverVisitor = this.retrieveVisitorInstance(['document', 'objects', 'Server']);
          visit(objectNode, serverVisitor);
          return serverVisitor.element;
        });

      const serversElement = new this.namespace.elements.Array(serverElements);
      serversElement.classes.push('servers');

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(arrayNode, serversElement),
      );

      return BREAK;
    },
  },
});

export default ServersVisitor;
