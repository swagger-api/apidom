import stampit from 'stampit';
import { propEq } from 'ramda';
import { isNotUndefined, isString } from 'ramda-adjunct';

import { ReferenceSet as IReferenceSet } from './types';
import type Reference from './Reference';

const ReferenceSet: stampit.Stamp<IReferenceSet> = stampit({
  props: {
    rootRef: null,
    refs: [],
    circular: false,
  },
  init({ refs = [] } = {}) {
    this.refs = [];
    refs.forEach((ref: Reference) => this.add(ref));
  },
  methods: {
    get size(): number {
      // @ts-ignore
      return this.refs.length;
    },

    add(reference: Reference): IReferenceSet {
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

    has(thing: string | Reference): boolean {
      const uri = isString(thing) ? thing : thing.uri;
      return isNotUndefined(this.find(propEq(uri, 'uri')));
    },

    find(callback): Reference | undefined {
      return this.refs.find(callback);
    },

    *values() {
      yield* this.refs;
    },

    clean() {
      this.refs.forEach((ref: Reference) => {
        ref.refSet = undefined; // eslint-disable-line no-param-reassign
      });
      this.rootRef = null;
      this.refs = [];
    },
  },
});

export default ReferenceSet;
