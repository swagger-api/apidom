import stampit from 'stampit';
import { BREAK } from '../..';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isOpenApiExtension } from '../../../predicates';

const LicenseVisitor = stampit(SpecificationVisitor, {
  methods: {
    key(keyNode) {
      this.element.key = this.maybeAddSourceMap(
        keyNode,
        new this.namespace.elements.String('license'),
      );
    },

    property(propertyNode) {
      const { MemberElement } = this.namespace.elements.Element.prototype;
      this.element = this.maybeAddSourceMap(propertyNode, new MemberElement());
    },

    object(objectNode) {
      const licenseElement = new this.namespace.elements.License();

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

      this.element.value = this.maybeAddSourceMap(objectNode, licenseElement);

      return BREAK;
    },
  },
});

export default LicenseVisitor;
