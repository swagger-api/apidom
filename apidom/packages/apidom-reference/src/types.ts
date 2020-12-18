import { ParseResultElement } from 'apidom';

export interface File {
  uri: string;
  data: unknown;
  readonly extension: string;
}

export interface Resolver {
  type: string;

  canRead(file: File): boolean;
  read(file: File): Promise<Buffer>;
}

export interface HttpResolver extends Resolver {
  timeout: number;
  redirects: number;
  withCredentials: boolean;

  getHttpClient(): unknown;
}

export interface Parser {
  allowEmpty: boolean;
  sourceMap: boolean;
  specPath: string;

  canParse(file: File): boolean;
  parse(file: File): Promise<ParseResultElement>;
}

export interface Reference {
  uri: string;
  depth: number;
  value: unknown;
  refSet: null | ReferenceSet;
  errors: Array<Error>;

  resolve(): Promise<Reference>;
}

export interface ReferenceSet {
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

export interface ReferenceParserOptions {
  readonly mediaType: string;
}

export interface ReferenceResolveOptions {
  baseURI: string;
  readonly resolvers: Array<Resolver>;
  readonly external: boolean;
}

export interface ReferenceOptions {
  readonly parse: ReferenceParserOptions;
  readonly resolve: ReferenceResolveOptions;
}
