import { createNamespace } from '@swagger-api/apidom-core';

export { default as mediaTypes } from './media-types';

export const detect: (source?: string) => boolean = () => {
  /**
   * We always return false here as there is no simple
   * way of synchronously determining if the string is YAML.
   * Media type should be used to activate this adapter.
   */
  return false;
};

export const namespace = createNamespace();
