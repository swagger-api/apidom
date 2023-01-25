import { createNamespace } from '@swagger-api/apidom-core';

export { default as mediaTypes } from './media-types';

export const namespace = createNamespace();

export const detectionRegExp =
  /(^\s*true\s*$)|(^\s*false\s*$)|(^\s*null\s*$)|(^\s*\d+\s*$)|(^\s*{\s*)|(^\s*\[\s*)|(^\s*"([^"]*|["\b\f\n\r\t]|\\u[0-9a-f]{4})*"\s*$)/;
