import stampit from 'stampit';
import YamlNode from './YamlNode';

interface YamlKeyValuePair extends YamlNode {
  type: 'keyValuePair';
}

const YamlKeyValuePair: stampit.Stamp<YamlKeyValuePair> = stampit(YamlNode, {
  statics: {
    type: 'keyValuePair',
  },
});

export default YamlKeyValuePair;
