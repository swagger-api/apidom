import stampit from 'stampit';
import { YamlAlias, YamlKeyValuePair, YamlMapping, YamlScalar, YamlSequence } from 'apidom-ast';
// @ts-ignore
import { SpecificationVisitor, BREAK, visit } from 'apidom-parser-adapter-yaml-1-2';

import { isAsyncApiExtension } from '../predicates';

const SpecificationExtensionVisitor = stampit(SpecificationVisitor, {
  methods: {
    keyValuePair(keyValuePairNode: YamlKeyValuePair) {
      type YamlValue = YamlScalar | YamlMapping | YamlSequence | YamlAlias;
      const { key: keyNode } = keyValuePairNode;
      const { value: valueNode }: { value: YamlValue } = keyValuePairNode;
      const keyElement = new this.namespace.elements.String(keyNode.content);
      const { MemberElement } = this.namespace.elements.Element.prototype;
      const state = { namespace: this.namespace, sourceMap: this.sourceMap, specObj: this.specObj };
      const valueVisitor = this.retrieveVisitorInstance(['kind']);

      // @ts-ignore
      visit(valueNode, valueVisitor, { state });

      const memberElement = this.maybeAddSourceMap(
        keyValuePairNode,
        new MemberElement(
          this.maybeAddSourceMap(keyNode, keyElement),
          this.maybeAddSourceMap(valueNode, valueVisitor.element),
        ),
      );

      if (isAsyncApiExtension({}, keyValuePairNode)) {
        memberElement.classes.push('specificationExtension');
      }

      this.element = memberElement;

      return BREAK;
    },
  },
});

export default SpecificationExtensionVisitor;
