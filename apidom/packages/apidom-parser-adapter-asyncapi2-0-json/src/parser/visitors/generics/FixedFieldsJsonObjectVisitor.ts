import stampit from 'stampit';
import { noop } from 'ramda-adjunct';

import SpecificationVisitor from '../SpecificationVisitor';
import { isAsyncApiExtension } from '../../predicates';
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

      objectNode.properties.forEach((propertyNode: any) => {
        const keyName = propertyNode.key.value;

        if (fields.includes(keyName) && !this.ignoredFields.includes(keyName)) {
          const visitor = this.retrieveVisitorInstance([
            ...specPath,
            'fixedFields',
            propertyNode.key.value,
          ]);
          const keyElement = new this.namespace.elements.String(keyName);
          const { MemberElement } = this.namespace.elements.Element.prototype;

          visit(propertyNode, visitor);

          const memberElement = this.maybeAddSourceMap(
            propertyNode,
            new MemberElement(
              this.maybeAddSourceMap(propertyNode.key, keyElement),
              visitor.element,
            ),
          );

          this.element.content.push(memberElement);
        } else if (
          this.canSupportSpecificationExtensions &&
          isAsyncApiExtension({}, propertyNode)
        ) {
          const visitor = this.retrieveVisitorInstance(['document', 'extension']);
          visit(propertyNode, visitor);
          this.element.content.push(visitor.element);
        }
      });

      this.maybeAddSourceMap(objectNode, this.element);

      return BREAK;
    },
  },
});

export default FixedFieldsJsonObjectVisitor;
