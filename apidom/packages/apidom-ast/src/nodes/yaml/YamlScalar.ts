import stampit from 'stampit';

import YamlNode from './YamlNode';

interface YamlScalar extends YamlNode {
  type: 'scalar';
  format: string | null;
  content: string | null;
}

const YamlScalar: stampit.Stamp<YamlScalar> = stampit(YamlNode, {
  statics: {
    type: 'scalar',
  },
  init({ format = null } = {}) {
    this.format = format;
  },
});

export default YamlScalar;
