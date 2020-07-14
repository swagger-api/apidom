import stampit from 'stampit';
import { visit, BREAK } from '../../../visitor';
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
      const licenseElement = new this.namespace.elements.Object();
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);

      objectNode.properties.forEach((propertyNode) => {
        if (['name', 'identifier', 'url'].includes(propertyNode.key.value)) {
          licenseElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'openApi', 'info', 'license', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          licenseElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'openApi', 'openApiExtension'],
              propertyNode,
            ),
          );
        }
      });

      visit(objectNode.comments, commentVisitor);
      licenseElement.meta.set('comments', commentVisitor.element);
      licenseElement.classes.push('license');

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, licenseElement),
      );

      return BREAK;
    },
  },
});

export default LicenseVisitor;
