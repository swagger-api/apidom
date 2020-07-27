import stampit from 'stampit';
import NodeType from '../../node-type';
import Position from '../../Position';

interface JsonNode {
  type: NodeType;
  position: Position | null;
}

const JsonNode: stampit.Stamp<JsonNode> = stampit({
  props: {
    type: null,
    position: null,
  },
});

export default JsonNode;
