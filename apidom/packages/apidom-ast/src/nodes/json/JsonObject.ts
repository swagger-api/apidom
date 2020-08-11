import stampit from 'stampit';

import Node from '../../Node';
import { isProperty } from './predicates';

type JsonObject = Node;

const JsonObject: stampit.Stamp<JsonObject> = stampit(Node, {
  statics: {
    type: 'object',
  },
  methods: {
    get properties(): unknown[] {
      // @ts-ignore
      return this.children.filter(isProperty);
    },
  },
});

export default JsonObject;
