import stampit from 'stampit';
import { visit, BREAK } from '../../visitor';
import SpecificationVisitor from '../SpecificationVisitor';
import { isOpenApiExtension } from '../../predicates';

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
      const commentVisitor = this.retrieveVisitorInstance(['document', 'comment']);
      const supportedProps = [
        'title',
        'description',
        'termsOfService',
        'version',
        'contact',
        'license',
      ];

      objectNode.properties.forEach((propertyNode) => {
        if (supportedProps.includes(propertyNode.key.value)) {
          infoElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'openApi', 'info', propertyNode.key.value],
              propertyNode,
            ),
          );
        } else if (isOpenApiExtension({}, propertyNode)) {
          infoElement.content.push(
            this.mapPropertyNodeToMemberElement(
              ['document', 'openApi', 'openApiExtension'],
              propertyNode,
            ),
          );
        }
      });

      visit(objectNode.comments, commentVisitor);
      infoElement.meta.set('comments', commentVisitor.element);

      this.element = new MemberElement(
        this.keyElement,
        this.maybeAddSourceMap(objectNode, infoElement),
      );

      return BREAK;
    },
  },
});

export default InfoVisitor;
