import { ParseResultElement, Element } from '@swagger-api/apidom-core';

export interface File {
  uri: string;
  mediaType: string;
  data: Buffer | DataView | ArrayBuffer | string;
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
  fileExtensions: string[];
  mediaTypes: string[];
  decoder: TextDecoder;

  canParse(file: File): boolean | Promise<boolean>;
  parse(file: File): Promise<ParseResultElement>;
}

export interface ResolveStrategy {
  canResolve(file: File): boolean;
  resolve(file: File, options: ReferenceOptions): Promise<ReferenceSet>;
}

export interface DereferenceStrategy {
  canDereference(file: File): boolean;
  dereference(file: File, options: ReferenceOptions): Promise<Element>;
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
  clean(): void;
}

export interface ReferenceParserOptions {
  readonly mediaType: string;
  readonly parsers: Array<Parser>;
  readonly parserOpts: Record<string, any>;
}

export interface ReferenceResolveOptions {
  baseURI: string;
  readonly resolvers: Array<Resolver>;
  readonly resolverOpts: Record<string, any>;
  readonly strategies: Array<ResolveStrategy>;
  readonly external: boolean;
  readonly maxDepth: number;
}

export interface ReferenceDereferenceOptions {
  readonly strategies: Array<DereferenceStrategy>;
  readonly refSet: null | ReferenceSet;
  readonly maxDepth: number;
}

export interface ReferenceOptions {
  readonly parse: ReferenceParserOptions;
  readonly resolve: ReferenceResolveOptions;
  readonly dereference: ReferenceDereferenceOptions;
}
