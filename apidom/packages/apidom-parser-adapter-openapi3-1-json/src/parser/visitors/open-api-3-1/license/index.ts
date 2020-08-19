import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isOpenApiExtension } from '../../../predicates';

const LicenseVisitor = stampit(SpecificationVisitor, {
  props: {
    keyElement: null,
  },
  methods: {
    key(keyNode) {
      this.keyElement = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('license'),
      );
    },

    object(objectNode) {
      const licenseElement = new this.namespace.elements.License();
      const { MemberElement } = this.namespace.elements.Element.prototype;

      // @ts-ignore
      objectNode.properties.forEach((propertyNode) => {
        if (['name', 'identifier', 'url'].includes(propertyNode.key.value)) {
          licenseElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'objects', 'License', 'fields', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          licenseElement.content.push(
            this.mapPropertyNodeToMemberElement(['document', 'extension'], propertyNode),
          );
        }
      });

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, licenseElement),
      );

      return BREAK;
    },
  },
});

export default LicenseVisitor;
