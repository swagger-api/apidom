import stampit from 'stampit';
import { propEq } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';

import { Reference as IReference, ReferenceSet as IReferenceSet } from './types';

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

    merge(anotherRefSet: IReferenceSet): IReferenceSet {
      for (const reference of anotherRefSet.values()) {
        this.add(reference);
      }
      return this;
    },

    has(uri: string): boolean {
      return isNotUndefined(this.find(propEq('uri', uri)));
    },

    find(callback): IReference | undefined {
      return this.refs.find(callback);
    },

    *values() {
      yield* this.refs;
    },
  },
});

export default ReferenceSet;
