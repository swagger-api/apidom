import stampit from 'stampit';
import { isString } from 'ramda-adjunct';

import {
  formatFlowPlain,
  formatFlowSingleQuoted,
  formatFlowDoubleQuoted,
  formatBlockLiteral,
  formatBlockFolded,
} from './canonical-format';
import { YamlStyle } from '../nodes/YamlStyle';
import { YamlNodeKind } from '../nodes/YamlTag';

const ScalarTag = stampit({
  methods: {
    test(node) {
      return node.tag.kind === YamlNodeKind.Scalar && isString(node.content);
    },

    canonicalFormat(node) {
      let canonicalForm = node.content;

      if (node.style === YamlStyle.Plain) {
        // @ts-ignore
        canonicalForm = formatFlowPlain(node.content);
      } else if (node.style === YamlStyle.SingleQuoted) {
        // @ts-ignore
        canonicalForm = formatFlowSingleQuoted(node.content);
      } else if (node.style === YamlStyle.DoubleQuoted) {
        // @ts-ignore
        canonicalForm = formatFlowDoubleQuoted(node.content);
      } else if (node.style === YamlStyle.Literal) {
        // @ts-ignore
        canonicalForm = formatBlockLiteral(node.content);
      } else if (node.style === YamlStyle.Folded) {
        // @ts-ignore
        canonicalForm = formatBlockFolded(node.content);
      }

      return { ...node, content: canonicalForm };
    },
  },
});

export default ScalarTag;
