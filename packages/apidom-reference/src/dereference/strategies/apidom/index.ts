import { Element, isElement, cloneDeep, visit } from '@swagger-api/apidom-core';

import DereferenceStrategy, { DereferenceStrategyOptions } from '../DereferenceStrategy';
import File from '../../../File';
import Reference from '../../../Reference';
import ReferenceSet from '../../../ReferenceSet';
import ApiDOMDereferenceVisitor from './visitor';
import type { ReferenceOptions } from '../../../options';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

export interface ApiDOMDereferenceStrategyOptions
  extends Omit<DereferenceStrategyOptions, 'name'> {}

class ApiDOMDereferenceStrategy extends DereferenceStrategy {
  constructor(options?: ApiDOMDereferenceStrategyOptions) {
    super({ ...(options ?? {}), name: 'apidom' });
  }

  canDereference(file: File) {
    return (
      file.mediaType.startsWith('application/vnd.apidom') && isElement(file.parseResult?.result)
    );
  }

  async dereference(file: File, options: ReferenceOptions): Promise<Element> {
    const immutableRefSet = options.dereference.refSet ?? new ReferenceSet();
    const mutableRefSet = new ReferenceSet();
    let refSet = immutableRefSet;
    let reference;

    // determine the initial reference
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

    const visitor = new ApiDOMDereferenceVisitor({ reference: reference!, options });
    const dereferencedElement = await visitAsync(refSet.rootRef!.value, visitor);

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

export { ApiDOMDereferenceVisitor };
export default ApiDOMDereferenceStrategy;
