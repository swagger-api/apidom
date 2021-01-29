import stampit from 'stampit';

import YamlNode from './YamlNode';

type YamlCollection = YamlNode;

const YamlCollection: stampit.Stamp<YamlCollection> = stampit(YamlNode, {});

export default YamlCollection;
