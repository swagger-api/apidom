import stampit from 'stampit';

interface Reference {
  depth: number;
  value: null | unknown;
  target: null | unknown;
}

const Reference: stampit.Stamp<Reference> = stampit({
  props: {
    depth: 0,
    value: null,
    target: null,
  },
  init(this: Reference, { depth = this.depth, target = this.target } = {}) {
    this.depth = depth;
    this.target = target;
  },
});

export default Reference;
