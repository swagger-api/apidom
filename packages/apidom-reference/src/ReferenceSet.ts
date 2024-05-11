import { isNotUndefined, isString } from 'ramda-adjunct';

import type Reference from './Reference';

export interface ReferenceSetOptions {
  readonly refs?: Reference[];
  readonly circular?: boolean;
}

class ReferenceSet {
  public rootRef?: Reference;

  public readonly refs: Reference[];

  public readonly circular: boolean;

  constructor({ refs = [], circular = false }: ReferenceSetOptions = {}) {
    this.refs = [];
    this.circular = circular;
    refs.forEach(this.add.bind(this));
  }

  get size(): number {
    return this.refs.length;
  }

  add(reference: Reference): this {
    if (!this.has(reference)) {
      this.refs.push(reference);
      this.rootRef = this.rootRef === undefined ? reference : this.rootRef;
      reference.refSet = this; // eslint-disable-line no-param-reassign
    }
    return this;
  }

  merge(anotherRefSet: this): this {
    for (const reference of anotherRefSet.values()) {
      this.add(reference);
    }
    return this;
  }

  has(thing: string | Reference): boolean {
    const uri = isString(thing) ? thing : thing.uri;
    return isNotUndefined(this.find((ref: Reference) => ref.uri === uri));
  }

  find(
    predicate: (value: Reference, index: number, obj: Reference[]) => boolean,
  ): Reference | undefined {
    return this.refs.find(predicate);
  }

  *values() {
    yield* this.refs;
  }

  clean() {
    this.refs.forEach((ref: Reference) => {
      ref.refSet = undefined; // eslint-disable-line no-param-reassign
    });
    this.rootRef = undefined;
    this.refs.length = 0;
  }
}

export default ReferenceSet;
