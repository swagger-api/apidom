import stampit from 'stampit';

import YamlNode from './YamlNode';

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
    content: '',
  },
  init({ content } = {}) {
    this.content = content;
  },
});

export default YamlScalar;
