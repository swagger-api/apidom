import stampit from 'stampit';
import { BREAK } from '..';
import SpecificationVisitor from '../SpecificationVisitor';
import { isOpenApiExtension } from '../../predicates';

const PathsVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('paths'),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      const pathsElement = new this.namespace.elements.Paths();

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

      this.element.value = this.maybeAddSourceMap(objectNode, pathsElement);

      return BREAK;
    },
  },
});

export default PathsVisitor;
