import stampit from 'stampit';

import YamlNode from './YamlNode';

interface YamlCollection extends YamlNode {
  readonly children: Array<unknown>;
}

const YamlCollection: stampit.Stamp<YamlCollection> = stampit(YamlNode, {});

export default YamlCollection;
