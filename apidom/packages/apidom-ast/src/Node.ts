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
});

export default Node;
