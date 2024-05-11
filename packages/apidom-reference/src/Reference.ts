import { ParseResultElement } from '@swagger-api/apidom-core';

import { ReferenceSet } from './types';

export interface ReferenceOptions {
  readonly uri: string;
  readonly depth?: number;
  readonly refSet?: ReferenceSet;
  readonly value: ParseResultElement;
}

class Reference {
  public readonly uri: string;

  public readonly depth: number;

  public readonly value: ParseResultElement;

  public refSet?: ReferenceSet;

  public readonly errors: Array<Error>;

  constructor({ uri, depth = 0, refSet, value }: ReferenceOptions) {
    this.uri = uri;
    this.value = value;
    this.depth = depth;
    this.refSet = refSet;
    this.errors = [];
  }
}

export default Reference;
