import stampit from 'stampit';
import { F as stubFalse } from 'ramda';
import { noop } from 'ramda-adjunct';

import SpecificationVisitor from '../SpecificationVisitor';
import { isOpenApiExtension } from '../../predicates';
import { visit, BREAK } from '..';

const PatternedFieldsJsonObjectVisitor = stampit(SpecificationVisitor, {
  props: {
    fieldPatternPredicate: stubFalse,
    specPath: noop,
    ignoredFields: [],
    canSupportSpecificationExtensions: false,
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
      objectNode.properties.forEach((propertyNode: any) => {
        const keyName = propertyNode.key.value;

        if (this.canSupportSpecificationExtensions && isOpenApiExtension({}, propertyNode)) {
          const visitor = this.retrieveVisitorInstance(['document', 'extension']);
          visit(propertyNode, visitor);
          this.element.content.push(visitor.element);
        } else if (!this.ignoredFields.includes(keyName) && this.fieldPatternPredicate(keyName)) {
          const specPath = this.specPath(propertyNode.value);
          const visitor = this.retrieveVisitorInstance(specPath);
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
        }
      });

      this.maybeAddSourceMap(objectNode, this.element);

      return BREAK;
    },
  },
});

export default PatternedFieldsJsonObjectVisitor;
