import { createNamespace } from '@swagger-api/apidom-core';

export { default as mediaTypes } from './media-types.ts';
export type { YamlMediaTypes } from './media-types.ts';

/**
 * @public
 */
export const namespace = createNamespace();
