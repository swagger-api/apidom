import stampit from 'stampit';

const Reference: stampit.Stamp<Reference> = stampit({
  props: {
    uri: '',
    depth: 0,
    value: null,
    refSet: null,
    errors: [],
  },
  init(this: Reference, { depth = this.depth, refSet = this.refSet, uri = this.uri } = {}) {
    this.uri = uri;
    this.depth = depth;
    this.refSet = refSet;
    this.errors = [];
  },
  methods: {
    async resolve(): Promise<Reference> {
      return Promise.resolve(this);
    },
  },
});

export default Reference;
