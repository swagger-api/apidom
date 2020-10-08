import stampit from 'stampit';

import YamlNode from './YamlNode';

interface YamlScalar extends YamlNode {
  type: 'scalar';
  format: string | null;
  text: string | null;
  readonly content: string | null;
}

const YamlScalar: stampit.Stamp<YamlScalar> = stampit(YamlNode, {
  statics: {
    type: 'scalar',
  },
  props: {
    text: null,
  },
  init({ text = null, format = null } = {}) {
    this.text = text;
    this.format = format;
  },
  methods: {
    // @ts-ignore
    get content() {
      // @ts-ignore
      return this.text;
    },
  },
});

export default YamlScalar;
