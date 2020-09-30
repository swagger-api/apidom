import stampit from 'stampit';

import Node from '../../Node';
import YamlStyleModel from './YamlStyle';

interface YamlKeyValuePair extends Node, YamlStyleModel {
  type: 'keyValuePair';
}

const YamlKeyValuePair: stampit.Stamp<YamlKeyValuePair> = stampit(Node, YamlStyleModel, {
  statics: {
    type: 'keyValuePair',
  },
});

export default YamlKeyValuePair;
