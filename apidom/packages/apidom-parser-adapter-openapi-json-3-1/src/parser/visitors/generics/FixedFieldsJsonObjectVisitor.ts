import stampit from 'stampit';
import { noop } from 'ramda-adjunct';

import SpecificationVisitor from '../SpecificationVisitor';
import { isOpenApiExtension } from '../../predicates';
import { visit, BREAK } from '..';

const FixedFieldsJsonObjectVisitor = stampit(SpecificationVisitor, {
  props: {
    specPath: noop,
    ignoredFields: [],
    canSupportSpecificationExtensions: true,
  },
  init({
    // @ts-ignore
    specPath = this.specPath,
    // @ts-ignore
    ignoredFields = this.ignoredFields,
    // @ts-ignore
    canSupportSpecificationExtensions = this.canSupportSpecificationExtensions,
  } = {}) {
    this.specPath = specPath;
    this.ignoredFields = ignoredFields;
    this.canSupportSpecificationExtensions = canSupportSpecificationExtensions;
  },
  methods: {
    object(objectNode) {
      const specPath = this.specPath(objectNode);
      const fields = this.retrieveFixedFields(specPath);
      const { MemberElement } = this.namespace.elements.Element.prototype;

      objectNode.properties.forEach((propertyNode: any) => {
        const keyName = propertyNode.key.value;

        if (fields.includes(keyName) && !this.ignoredFields.includes(keyName)) {
          const visitor = this.retrieveVisitorInstance([
            ...specPath,
            'fixedFields',
            propertyNode.key.value,
          ]);
          const keyElement = new this.namespace.elements.String(keyName);

          visit(propertyNode.value, visitor);

          const memberElement = this.maybeAddSourceMap(
            propertyNode,
            new MemberElement(
              this.maybeAddSourceMap(propertyNode.key, keyElement),
              visitor.element,
            ),
          );
          memberElement.classes.push('fixedField');

          this.element.content.push(memberElement);
        } else if (this.canSupportSpecificationExtensions && isOpenApiExtension({}, propertyNode)) {
          const visitor = this.retrieveVisitorInstance(['document', 'extension']);
          visit(propertyNode, visitor);
          this.element.content.push(visitor.element);
        } else if (!this.ignoredFields.includes(keyName)) {
          const keyElement = new this.namespace.elements.String(keyName);
          const memberElement = this.maybeAddSourceMap(
            propertyNode,
            new MemberElement(
              this.maybeAddSourceMap(propertyNode.key, keyElement),
              this.nodeToElement(['value'], propertyNode.value),
            ),
          );
          this.element.content.push(memberElement);
        }
      });

      this.maybeAddSourceMap(objectNode, this.element);

      return BREAK;
    },
  },
});

export default FixedFieldsJsonObjectVisitor;
