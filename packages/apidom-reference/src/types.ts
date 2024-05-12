import { Element, ParseResultElement, RefElement } from '@swagger-api/apidom-core';

import type File from './File';
import type ReferenceSet from './ReferenceSet';
import type Resolver from './resolve/resolvers/Resolver';

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
  canDereference(file: File, options: ReferenceOptions): boolean;
  dereference(file: File, options: ReferenceOptions): Promise<Element>;
}

export interface BundleStrategy {
  canBundle(file: File): boolean;
  bundle(file: File, options: ReferenceOptions): Promise<Element>;
}

export interface ComposableResolveStrategy extends ResolveStrategy {
  readonly strategies: Array<ResolveStrategy>;
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
  strategyOpts: Record<string, any>;
  internal: boolean;
  external: boolean;
  maxDepth: number;
}

export interface ReferenceDereferenceOptions {
  strategies: Array<DereferenceStrategy>;
  strategyOpts: Record<string, any>;
  refSet: null | ReferenceSet;
  maxDepth: number;
  circular: 'ignore' | 'replace' | 'error';
  circularReplacer: (ref: RefElement) => unknown;
  immutable: boolean;
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
