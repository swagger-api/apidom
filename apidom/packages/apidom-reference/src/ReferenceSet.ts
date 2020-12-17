import stampit from 'stampit';
import { curry } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';

import Reference from './Reference';

const comparator = curry((r1: Reference, r2: Reference): boolean => r1.uri === r2.uri);

const ReferenceSet: stampit.Stamp<ReferenceSet> = stampit({
  props: {
    rootRef: null,
    refs: [],
    circular: false,
  },
  init() {
    this.refs = [];
  },
  methods: {
    get size(): number {
      // @ts-ignore
      return this.refs.length;
    },

    add(reference: Reference): ReferenceSet {
      if (!this.has(reference)) {
        this.refs.push(reference);
        this.rootRef = this.rootRef === null ? reference : this.rootRef;
      }
      return this;
    },

    has(reference: Reference): boolean {
      return isNotUndefined(this.find(comparator(reference)));
    },

    find(callback): Reference | undefined {
      return this.refs.find(callback);
    },

    *values() {
      yield* this.refs;
    },

    async resolve(): Promise<ReferenceSet> {
      return Promise.resolve(this);
    },
  },
});

export default ReferenceSet;
