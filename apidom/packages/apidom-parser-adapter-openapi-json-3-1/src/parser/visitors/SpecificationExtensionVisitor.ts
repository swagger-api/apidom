import stampit from 'stampit';
// @ts-ignore
import { SpecificationVisitor, visit, BREAK } from 'apidom-parser-adapter-json';

import { isOpenApiExtension } from '../predicates';

const SpecificationExtensionVisitor = stampit(SpecificationVisitor, {
  methods: {
    property(propertyNode) {
      const keyElement = new this.namespace.elements.String(propertyNode.key.value);
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const state = { namespace: this.namespace, sourceMap: this.sourceMap, specObj: this.specObj };
      const valueVisitor = this.retrieveVisitorInstance(['value']);

      // @ts-ignore
      visit(propertyNode.value, valueVisitor, { state });

      const memberElement = this.maybeAddSourceMap(
        propertyNode,
        new MemberElement(
          this.maybeAddSourceMap(propertyNode.key, keyElement),
          this.maybeAddSourceMap(propertyNode.value, valueVisitor.element),
        ),
      );

      if (isOpenApiExtension({}, propertyNode)) {
        memberElement.classes.push('specificationExtension');
      }

      this.element = memberElement;

      return BREAK;
    },
  },
});

export default SpecificationExtensionVisitor;
