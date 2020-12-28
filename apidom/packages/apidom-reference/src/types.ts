import { ParseResultElement } from 'apidom';

export interface File {
  uri: string;
  mediaType: string;
  data: Buffer;
  parseResult: ParseResultElement;
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

  canParse(file: File): boolean;
  parse(file: File): Promise<ParseResultElement>;
}

export interface ResolveStrategy {
  canResolve(file: File): boolean;
  resolve(file: File, options: ReferenceOptions): Promise<ReferenceSet>;
}

export interface ComposableResolveStrategy extends ResolveStrategy {
  readonly strategies: Array<ResolveStrategy>;
}

export interface Reference {
  uri: string;
  depth: number;
  value: ParseResultElement;
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
  merge(anotherRefSet: ReferenceSet): ReferenceSet;
  has(uri: string): boolean;
  find(callback: (reference: Reference) => boolean): undefined | Reference;
  values(): IterableIterator<Reference>;
}

export interface ReferenceParserOptions {
  readonly mediaType: string;
  readonly parsers: Array<Parser>;
}

export interface ReferenceResolveOptions {
  baseURI: string;
  readonly resolvers: Array<Resolver>;
  readonly strategy: null | ResolveStrategy;
  readonly strategies: Array<ResolveStrategy>;
  readonly external: boolean;
}

export interface ReferenceOptions {
  readonly parse: ReferenceParserOptions;
  readonly resolve: ReferenceResolveOptions;
}
