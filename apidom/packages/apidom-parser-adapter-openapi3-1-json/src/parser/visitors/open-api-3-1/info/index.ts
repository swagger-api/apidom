import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isOpenApiExtension } from '../../../predicates';

const InfoVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('info'),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      const infoElement = new this.namespace.elements.Info();
      const supportedProps = [
        'title',
        'description',
        'summary',
        'termsOfService',
        'version',
        'contact',
        'license',
      ];

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        if (supportedProps.includes(propertyNode.key.value)) {
          infoElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'Info', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          infoElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      this.element.value = this.maybeAddSourceMap(objectNode, infoElement);

      return BREAK;
    },
  },
});

export default InfoVisitor;
