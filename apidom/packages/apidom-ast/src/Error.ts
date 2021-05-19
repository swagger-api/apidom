import stampit from 'stampit';

import Node from './Node';

interface Error extends Node {
  value: unknown;
  isUnexpected: boolean;
}

const Error: stampit.Stamp<Error> = stampit(Node, {
  statics: {
    type: 'error',
  },
  props: {
    value: null,
    isUnexpected: false,
  },
  init({ value = null, isUnexpected = false } = {}) {
    this.value = value;
    this.isUnexpected = isUnexpected;
  },
});

export default Error;
