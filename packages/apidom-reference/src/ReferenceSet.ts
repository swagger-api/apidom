import stampit from 'stampit';
import { propEq } from 'ramda';
import { isNotUndefined, isString } from 'ramda-adjunct';

import { Reference as IReference, ReferenceSet as IReferenceSet } from './types';

const ReferenceSet: stampit.Stamp<IReferenceSet> = stampit({
  props: {
    rootRef: null,
    refs: [],
    circular: false,
  },
  init({ refs = [] } = {}) {
    this.refs = [];
    refs.forEach((ref: IReference) => this.add(ref));
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
        reference.refSet = this; // eslint-disable-line no-param-reassign
      }
      return this;
    },

    merge(anotherRefSet: IReferenceSet): IReferenceSet {
      for (const reference of anotherRefSet.values()) {
        this.add(reference);
      }
      return this;
    },

    has(thing: string | IReference): boolean {
      const uri = isString(thing) ? thing : thing.uri;
      return isNotUndefined(this.find(propEq(uri, 'uri')));
    },

    find(callback): IReference | undefined {
      return this.refs.find(callback);
    },

    *values() {
      yield* this.refs;
    },

    clean() {
      this.refs.forEach((ref: IReference) => {
        // eslint-disable-next-line no-param-reassign
        ref.refSet = null;
      });
      this.refs = [];
    },
  },
});

export default ReferenceSet;
