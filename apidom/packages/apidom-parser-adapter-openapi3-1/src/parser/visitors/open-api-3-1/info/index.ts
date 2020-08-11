import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isOpenApiExtension } from '../../../predicates';

const InfoVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(keyNode, new this.namespace.elements.String('info'));
    },

    object(objectNode) {
      const infoElement = new this.namespace.elements.Info();
      const { MemberElement } = this.namespace.elements.Element.prototype;
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

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, infoElement),
      );

      return BREAK;
    },
  },
});

export default InfoVisitor;
