import { createNamespace } from '@swagger-api/apidom-core';

export { default as mediaTypes } from './media-types';

export const detect = async (source: string): Promise<boolean> => {
  try {
    JSON.parse(source);
  } catch (e) {
    return false;
  }
  return true;
};

export const namespace = createNamespace();
