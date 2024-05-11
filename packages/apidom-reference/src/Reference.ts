import { Element } from '@swagger-api/apidom-core';

import { ReferenceSet } from './types';

export interface ReferenceOptions<T = Element> {
  readonly uri: string;
  readonly depth?: number;
  readonly refSet?: ReferenceSet;
  readonly value: T;
}

class Reference<T = Element> {
  public readonly uri: string;

  public readonly depth: number;

  public readonly value: T;

  public refSet?: ReferenceSet;

  public readonly errors: Array<Error>;

  constructor({ uri, depth = 0, refSet, value }: ReferenceOptions<T>) {
    this.uri = uri;
    this.value = value;
    this.depth = depth;
    this.refSet = refSet;
    this.errors = [];
  }
}

export default Reference;
