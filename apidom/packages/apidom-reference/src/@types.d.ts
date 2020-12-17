interface Reference {
  uri: string;
  depth: number;
  value: unknown;
  refSet: null | ReferenceSet;
  errors: Array<Error>;

  resolve(): Promise<Reference>;
}

interface ReferenceSet {
  rootRef: Reference;
  refs: Array<Reference>;
  circular: boolean;
  readonly size: number;

  add(reference: Reference): ReferenceSet;
  has(reference: Reference): boolean;
  find(callback: (reference: Reference) => boolean): undefined | Reference;
  values(): IterableIterator<Reference>;
  resolve(): Promise<ReferenceSet>;
}
