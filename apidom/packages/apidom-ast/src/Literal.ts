import stampit from 'stampit';

import Node from './Node';

interface Literal extends Node {
  type: 'literal';
  value: unknown;
}

const Literal: stampit.Stamp<Literal> = stampit(Node, {
  statics: {
    type: 'literal',
  },
  props: {
    value: null,
  },
  init({ value = null } = {}) {
    this.value = value;
  },
});

export default Literal;
