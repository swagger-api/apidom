import stampit from 'stampit';
import { ValueVisitor } from './generics';
import SpecificationVisitor from './SpecificationVisitor';
import { isAsyncApiExtension } from '../predicates';
import { BREAK, visit } from '.';

const SpecificationExtensionVisitor = stampit(SpecificationVisitor, {
  methods: {
    property(propertyNode) {
      const keyElement = new this.namespace.elements.String(propertyNode.key.value);
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const state = { namespace: this.namespace, sourceMap: this.sourceMap, specObj: this.specObj };
      const valueVisitor = ValueVisitor();

      // @ts-ignore
      visit(propertyNode.value, valueVisitor, { state });

      const memberElement = this.maybeAddSourceMap(
        propertyNode,
        new MemberElement(
          this.maybeAddSourceMap(propertyNode.key, keyElement),
          this.maybeAddSourceMap(propertyNode.value, valueVisitor.element),
        ),
      );

      if (isAsyncApiExtension({}, propertyNode)) {
        memberElement.classes.push('specificationExtension');
      }

      this.element = memberElement;

      return BREAK;
    },
  },
});

export default SpecificationExtensionVisitor;
