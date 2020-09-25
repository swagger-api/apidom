import stampit from 'stampit';

import YamlNode from './YamlNode';

interface YamlScalar extends YamlNode {
  type: 'scalar';
  content: string | null;
}

const YamlScalar: stampit.Stamp<YamlScalar> = stampit(YamlNode, {
  statics: {
    type: 'scalar',
  },
});

export default YamlScalar;
