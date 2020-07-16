import stampit from 'stampit';
import { visit, BREAK } from '../../visitor';
import SpecificationVisitor from '../SpecificationVisitor';
import { isOpenApiExtension } from '../../predicates';

const ComponentsVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('components'),
      );
    },

    object(objectNode) {
      const componentsElement = new this.namespace.elements.Components();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);
      const supportedProps = ['schemas'];

      objectNode.properties.forEach((propertyNode) => {
        if (supportedProps.includes(propertyNode.key.value)) {
          componentsElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'Components', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          componentsElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      visit(objectNode.comments, commentVisitor);
      componentsElement.meta.set('comments', commentVisitor.element);

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, componentsElement),
      );

      return BREAK;
    },
  },
});

export default ComponentsVisitor;
