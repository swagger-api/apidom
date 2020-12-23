import stampit from 'stampit';

import { Reference as IReference } from './types';

const Reference: stampit.Stamp<IReference> = stampit({
  props: {
    uri: '',
    depth: 0,
    value: null,
    refSet: null,
    errors: [],
  },
  init(
    this: IReference,
    { depth = this.depth, refSet = this.refSet, uri = this.uri, value = this.value } = {},
  ) {
    this.uri = uri;
    this.value = value;
    this.depth = depth;
    this.refSet = refSet;
    this.errors = [];
  },
  methods: {
    async resolve(): Promise<IReference> {
      return Promise.resolve(this);
    },
  },
});

export default Reference;
