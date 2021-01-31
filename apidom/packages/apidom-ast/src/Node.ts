import stampit from 'stampit';

interface Node {
  type: string | null;
  isMissing: boolean;
  children: unknown[];
  position: Position | null;
}

const Node: stampit.Stamp<Node> = stampit({
  props: {
    type: null,
    position: null,
    children: [],
  },
  init({ children = [], position = null, isMissing = false } = {}, { stamp }) {
    this.type = stamp.type;
    this.isMissing = isMissing;
    this.children = children;
    this.position = position;
  },
  methods: {
    // creates shallow clone of node
    clone() {
      // 1. copy has same prototype as orig
      const copy = Object.create(Object.getPrototypeOf(this));

      // 2. copy has all of orig’s properties
      Object.getOwnPropertyNames(this) // (1)
        .forEach((propKey) => {
          // (2)
          const descriptor = Object.getOwnPropertyDescriptor(this, propKey); // (3)
          // @ts-ignore
          Object.defineProperty(copy, propKey, descriptor); // (4)
        });

      return copy;
    },
  },
});

export default Node;
