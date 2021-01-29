import stampit from 'stampit';

import YamlNode from '../YamlNode';
import { YamlStyle } from '../YamlStyle';
import {
  formatFlowPlain,
  formatFlowSingleQuoted,
  formatFlowDoubleQuoted,
  formatBlockLiteral,
} from './formats';

interface YamlScalar extends YamlNode {
  type: 'scalar';
  format: string | null;
  text: string;
  readonly content: string | null;
}

const YamlScalar: stampit.Stamp<YamlScalar> = stampit(YamlNode, {
  statics: {
    type: 'scalar',
  },
  props: {
    text: '',
  },
  init({ text } = {}) {
    this.text = text;
  },
  methods: {
    // @ts-ignore
    get content() {
      if (this.style === YamlStyle.Plain) {
        // @ts-ignore
        return formatFlowPlain(this);
      }
      if (this.style === YamlStyle.SingleQuoted) {
        // @ts-ignore
        return formatFlowSingleQuoted(this);
      }
      if (this.style === YamlStyle.DoubleQuoted) {
        // @ts-ignore
        return formatFlowDoubleQuoted(this);
      }
      if (this.style === YamlStyle.Literal) {
        // @ts-ignore
        return formatBlockLiteral(this);
      }

      // @ts-ignore
      return this.text;
    },
  },
});

export default YamlScalar;
