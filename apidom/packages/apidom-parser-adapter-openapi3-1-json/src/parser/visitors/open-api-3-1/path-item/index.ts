import stampit from 'stampit';
import { BREAK } from '../..';
import { isOpenApiExtension } from '../../../predicates';
import SpecificationVisitor from '../../SpecificationVisitor';

const PathItemVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String(keyNode.value),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      const pathItemElement = new this.namespace.elements.PathItem();
      const supportedProps = [
        '$ref',
        'description',
        'summary',
        'get',
        'put',
        'post',
        'delete',
        'options',
        'head',
        'patch',
        'trace',
        'servers',
        'parameters',
      ];

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        if (supportedProps.includes(propertyNode.key.value)) {
          pathItemElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'PathItem', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          pathItemElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      this.element.value = this.maybeAddSourceMap(objectNode, pathItemElement);

      return BREAK;
    },
  },
});

export default PathItemVisitor;
