import stampit from 'stampit';
import { curry } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';

import { Reference as IReference, ReferenceSet as IReferenceSet } from './types';

const comparator = curry((r1: IReference, r2: IReference): boolean => r1.uri === r2.uri);

const ReferenceSet: stampit.Stamp<IReferenceSet> = stampit({
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

    add(reference: IReference): IReferenceSet {
      if (!this.has(reference)) {
        this.refs.push(reference);
        this.rootRef = this.rootRef === null ? reference : this.rootRef;
      }
      return this;
    },

    has(reference: IReference): boolean {
      return isNotUndefined(this.find(comparator(reference)));
    },

    find(callback): IReference | undefined {
      return this.refs.find(callback);
    },

    *values() {
      yield* this.refs;
    },

    async resolve(): Promise<IReferenceSet> {
      return Promise.resolve(this);
    },
  },
});

export default ReferenceSet;
