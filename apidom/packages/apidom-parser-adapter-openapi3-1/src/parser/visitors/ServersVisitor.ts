import stampit from 'stampit';
import { nodeTypes } from 'json-ast';
import { visit, BREAK } from '../visitor';
import SpecificationVisitor from './SpecificationVisitor';

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
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);
      const serverElements = arrayNode.items
        .filter((jsonNode) => jsonNode.type === nodeTypes.OBJECT)
        .map((objectNode) => {
          const serverVisitor = this.retrieveVisitorInstance(['document', 'openApi', 'server']);
          visit(objectNode, serverVisitor);
          return serverVisitor.element;
        });

      visit(arrayNode.comments, commentVisitor);

      const serversElement = new this.namespace.elements.Array(serverElements);
      serversElement.classes.push('servers');
      serversElement.meta.set('comments', commentVisitor.element);

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(arrayNode, serversElement),
      );

      return BREAK;
    },
  },
});

export default ServersVisitor;
