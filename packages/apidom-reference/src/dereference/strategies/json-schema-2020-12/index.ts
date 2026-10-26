import { propEq } from 'ramda';
import { createNamespace, visit, Element, cloneDeep } from '@swagger-api/apidom-core';
import jsonSchema2020_12Namespace, {
  getNodeType,
  isJSONSchemaElement,
  keyMap,
  mediaTypes,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

import DereferenceStrategy, { DereferenceStrategyOptions } from '../DereferenceStrategy.ts';
import File from '../../../File.ts';
import Reference from '../../../Reference.ts';
import ReferenceSet from '../../../ReferenceSet.ts';
import JSONSchema2020_12DereferenceVisitor from './visitor.ts';
import type { ReferenceOptions } from '../../../options/index.ts';

export type {
  default as DereferenceStrategy,
  DereferenceStrategyOptions,
} from '../DereferenceStrategy.ts';
export type { default as File, FileOptions } from '../../../File.ts';
export type { default as Reference, ReferenceOptions } from '../../../Reference.ts';
export type { default as ReferenceSet, ReferenceSetOptions } from '../../../ReferenceSet.ts';
export type { JSONSchema2020_12DereferenceVisitorOptions, mutationReplacer } from './visitor.ts';
export type {
  ReferenceOptions as ApiDOMReferenceOptions,
  ReferenceBundleOptions as ApiDOMReferenceBundleOptions,
  ReferenceDereferenceOptions as ApiDOMReferenceDereferenceOptions,
  ReferenceParseOptions as ApiDOMReferenceParseOptions,
  ReferenceResolveOptions as ApiDOMReferenceResolveOptions,
} from '../../../options/index.ts';
export type { default as Parser, ParserOptions } from '../../../parse/parsers/Parser.ts';
export type { default as Resolver, ResolverOptions } from '../../../resolve/resolvers/Resolver.ts';
export type {
  default as ResolveStrategy,
  ResolveStrategyOptions,
} from '../../../resolve/strategies/ResolveStrategy.ts';
export type {
  default as BundleStrategy,
  BundleStrategyOptions,
} from '../../../bundle/strategies/BundleStrategy.ts';
export type { AncestorLineage } from '../../util.ts';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

/**
 * @public
 */
export interface JSONSchema2020_12DereferenceStrategyOptions
  extends Omit<DereferenceStrategyOptions, 'name'> {}

/**
 * Dereference strategy for JSON Schema 2020-12 documents.
 *
 * @public
 */
class JSONSchema2020_12DereferenceStrategy extends DereferenceStrategy {
  constructor(options?: JSONSchema2020_12DereferenceStrategyOptions) {
    super({ ...(options ?? {}), name: 'json-schema-2020-12' });
  }

  canDereference(file: File): boolean {
    // assert by media type
    if (file.mediaType !== 'text/plain') {
      return mediaTypes.includes(file.mediaType);
    }

    // assert by inspecting ApiDOM
    const result = file.parseResult?.result;
    return isJSONSchemaElement(result) && result.element === 'JSONSchema202012';
  }

  async dereference(file: File, options: ReferenceOptions): Promise<Element> {
    const namespace = createNamespace(jsonSchema2020_12Namespace);
    const immutableRefSet = options.dereference.refSet ?? new ReferenceSet();
    const mutableRefSet = new ReferenceSet();
    let refSet = immutableRefSet;
    let reference;

    if (!immutableRefSet.has(file.uri)) {
      reference = new Reference({ uri: file.uri, value: file.parseResult! });
      immutableRefSet.add(reference);
    } else {
      // pre-computed refSet was provided as configuration option
      reference = immutableRefSet.find(propEq(file.uri, 'uri'));
    }

    /**
     * Clone refSet due the dereferencing process being mutable.
     * We don't want to mutate the original refSet and the references.
     */
    if (options.dereference.immutable) {
      immutableRefSet.refs
        .map(
          (ref) =>
            new Reference({
              ...ref,
              value: cloneDeep(ref.value),
            }),
        )
        .forEach((ref) => mutableRefSet.add(ref));
      reference = mutableRefSet.find((ref) => ref.uri === file.uri);
      refSet = mutableRefSet;
    }

    const visitor = new JSONSchema2020_12DereferenceVisitor({
      reference: reference!,
      namespace,
      options,
    });
    const dereferencedElement = await visitAsync(refSet.rootRef!.value, visitor, {
      keyMap,
      nodeTypeGetter: getNodeType,
    });

    /**
     * The document root is a schema, so errors collected with `continueOnError`
     * are propagated once the whole document has been traversed.
     */
    if (options.dereference.dereferenceOpts?.continueOnError) {
      visitor.propagateErrors();
    }

    /**
     * If immutable option is set, replay refs from the refSet.
     */
    if (options.dereference.immutable) {
      mutableRefSet.refs
        .filter((ref) => ref.uri.startsWith('immutable://'))
        .map(
          (ref) =>
            new Reference({
              ...ref,
              uri: ref.uri.replace(/^immutable:\/\//, ''),
            }),
        )
        .forEach((ref) => immutableRefSet.add(ref));
    }

    /**
     * Release all memory if this refSet was not provided as an configuration option.
     * If provided as configuration option, then provider is responsible for cleanup.
     */
    if (options.dereference.refSet === null) {
      immutableRefSet.clean();
    }

    mutableRefSet.clean();

    return dereferencedElement;
  }
}

export { JSONSchema2020_12DereferenceVisitor };
export {
  resolveSchema$refField,
  resolveSchema$idField,
  maybeRefractToSchemaElement,
} from './util.ts';

export default JSONSchema2020_12DereferenceStrategy;
