import stampit from 'stampit';
import { BREAK } from '../..';
import { isOpenApiExtension } from '../../../predicates';
import SpecificationVisitor from '../../SpecificationVisitor';

const PathItemVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String(keyNode.value),
      );
    },

    object(objectNode) {
      const pathItemElement = new this.namespace.elements.PathItem();
      const { MemberElement } = this.namespace.elements.Element.prototype;
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

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, pathItemElement),
      );

      return BREAK;
    },
  },
});

export default PathItemVisitor;
