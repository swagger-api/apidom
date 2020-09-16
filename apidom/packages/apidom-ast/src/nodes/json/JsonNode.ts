import stampit from 'stampit';

import Node from '../../Node';

type JsonNode = Node;

const JsonNode: stampit.Stamp<JsonNode> = stampit(Node);

export default JsonNode;
