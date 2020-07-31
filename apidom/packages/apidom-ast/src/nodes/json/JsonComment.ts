import stampit from 'stampit';

import JsonValue from './JsonValue';
import NodeType from './node-type';

type JsonComment = JsonValue;

const JsonComment: stampit.Stamp<JsonComment> = stampit(JsonValue, {
  init() {
    this.type = NodeType.Comment;
  },
});

export default JsonComment;
