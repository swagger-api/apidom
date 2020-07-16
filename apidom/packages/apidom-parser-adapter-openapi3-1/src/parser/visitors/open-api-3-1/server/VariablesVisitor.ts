import stampit from 'stampit';
import { visit, BREAK } from '../../../visitor';
import SpecificationVisitor from '../../SpecificationVisitor';

const VariablesVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('variables'),
      );
    },

    object(objectNode) {
      const variablesElement = new this.namespace.elements.Object();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);

      objectNode.properties.forEach((propertyNode) => {
        variablesElement.content.push(
          this.mapPropertyNodeToMemberElement(
            ['document', 'objects', 'ServerVariable'],
            propertyNode,
          ),
        );
      });

      visit(objectNode.comments, commentVisitor);
      variablesElement.classes.push('variables');
      variablesElement.meta.set('comments', commentVisitor.element);

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, variablesElement),
      );

      return BREAK;
    },
  },
});

export default VariablesVisitor;
