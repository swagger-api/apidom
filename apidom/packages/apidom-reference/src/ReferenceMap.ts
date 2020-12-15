import stampit from 'stampit';
import { keys } from 'ramda';

interface ReferenceMap {
  rootRef: null;
  refs: Record<string, any>;
  circular: boolean;
  readonly length: number;

  set(uri: string, value?: unknown): ReferenceMap;
}

const ReferenceMap: stampit.Stamp<ReferenceMap> = stampit({
  props: {
    rootRef: null,
    refs: {},
    circular: false,
  },
  init() {
    this.refs = {};
  },
  methods: {
    get length(): number {
      return keys(this.refs).length;
    },

    set(uri: string, value: unknown = null): ReferenceMap {
      this.refs[uri] = value;
      this.rootRef = this.rootRef === null ? uri : this.rootRef;
      return this;
    },
  },
});

export default ReferenceMap;
