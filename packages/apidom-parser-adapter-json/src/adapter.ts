import { createNamespace } from '@swagger-api/apidom-core';

export { default as mediaTypes } from './media-types';

export const detect = (source: string): boolean => {
  try {
    JSON.parse(source);
  } catch {
    return false;
  }
  return true;
};

export const namespace = createNamespace();
