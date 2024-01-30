import { ParseResultElement, Element } from '@swagger-api/apidom-core';

export interface File {
  uri: string;
  mediaType: string;
  data: Buffer | DataView | ArrayBuffer | string;
  parseResult: ParseResultElement;
  readonly extension: string;
}

export interface Resolver {
  // name: string; - causing issues with stamps

  canRead(file: File): boolean;
  read(file: File): Promise<Buffer>;
}

export interface FileResolver extends Resolver {
  fileAllowList: (string | RegExp)[];
}

export interface HttpResolver extends Resolver {
  timeout: number;
  redirects: number;
  withCredentials: boolean;

  getHttpClient(): unknown;
}

export interface Parser {
  // name: string; - causing issues with stamps
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

export interface BundleStrategy {
  canBundle(file: File): boolean;
  bundle(file: File, options: ReferenceOptions): Promise<Element>;
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

export interface ReferenceParseOptions {
  mediaType: string;
  parsers: Array<Parser>;
  parserOpts: Record<string, any>;
}

export interface ReferenceResolveOptions {
  baseURI: string;
  resolvers: Array<Resolver>;
  resolverOpts: Record<string, any>;
  strategies: Array<ResolveStrategy>;
  external: boolean;
  maxDepth: number;
}

export interface ReferenceDereferenceOptions {
  strategies: Array<DereferenceStrategy>;
  refSet: null | ReferenceSet;
  maxDepth: number;
}

export interface ReferenceBundleOptions {
  strategies: Array<BundleStrategy>;
  refSet: null | ReferenceSet;
  maxDepth: number;
}

export interface ReferenceOptions {
  readonly parse: ReferenceParseOptions;
  readonly resolve: ReferenceResolveOptions;
  readonly dereference: ReferenceDereferenceOptions;
  readonly bundle: ReferenceBundleOptions;
}
