import { createNamespace, visit, Element, cloneDeep } from '@swagger-api/apidom-core';
import openApi2Namespace, {
  getNodeType,
  isSwaggerElement,
  keyMap,
  mediaTypes,
} from '@swagger-api/apidom-ns-openapi-2';

import DereferenceStrategy, { DereferenceStrategyOptions } from '../DereferenceStrategy';
import File from '../../../File';
import Reference from '../../../Reference';
import ReferenceSet from '../../../ReferenceSet';
import OpenApi2DereferenceVisitor from './visitor';
import type { ReferenceOptions } from '../../../options';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

export interface OpenAPI2DereferenceStrategyOptions
  extends Omit<DereferenceStrategyOptions, 'name'> {}

class OpenAPI2DereferenceStrategy extends DereferenceStrategy {
  constructor(options?: OpenAPI2DereferenceStrategyOptions) {
    super({ ...(options ?? {}), name: 'openapi-2' });
  }

  canDereference(file: File): boolean {
    // assert by media type
    if (file.mediaType !== 'text/plain') {
      return mediaTypes.includes(file.mediaType);
    }

    // assert by inspecting ApiDOM
    return isSwaggerElement(file.parseResult?.api);
  }

  async dereference(file: File, options: ReferenceOptions): Promise<Element> {
    const namespace = createNamespace(openApi2Namespace);
    const immutableRefSet = options.dereference.refSet ?? new ReferenceSet();
    const mutableRefSet = new ReferenceSet();
    let refSet = immutableRefSet;
    let reference;

    if (!immutableRefSet.has(file.uri)) {
      reference = new Reference({ uri: file.uri, value: file.parseResult! });
      immutableRefSet.add(reference);
    } else {
      // pre-computed refSet was provided as configuration option
      reference = immutableRefSet.find((ref) => ref.uri === file.uri);
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

    const visitor = OpenApi2DereferenceVisitor({ reference, namespace, options });
    const dereferencedElement = await visitAsync(refSet.rootRef!.value, visitor, {
      keyMap,
      nodeTypeGetter: getNodeType,
    });

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
      reference = immutableRefSet.find((ref) => ref.uri === file.uri);
      refSet = immutableRefSet;
    }

    /**
     * Release all memory if this refSet was not provided as a configuration option.
     * If provided as configuration option, then provider is responsible for cleanup.
     */
    if (options.dereference.refSet === null) {
      immutableRefSet.clean();
    }

    mutableRefSet.clean();

    return dereferencedElement;
  }
}

export default OpenAPI2DereferenceStrategy;
