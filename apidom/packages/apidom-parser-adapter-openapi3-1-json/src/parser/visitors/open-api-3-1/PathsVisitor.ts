import stampit from 'stampit';
import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';
import { isOpenApiExtension } from '../../predicates';

const PathsVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('paths'),
      );
    },

    object(objectNode) {
      const pathsElement = new this.namespace.elements.Paths();
      const { MemberElement } = this.namespace.elements.Element.prototype;

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        if (isOpenApiExtension({}, propertyNode)) {
          pathsElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        } else {
          pathsElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'objects', 'PathItem'], propertyNode),
          );
        }
      });

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, pathsElement),
      );

      return BREAK;
    },
  },
});

export default PathsVisitor;
