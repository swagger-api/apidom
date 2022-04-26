import configAsyncapi from './asyncapi/config';
import configOpenapi from './openapi/config';
import { Metadata } from '../apidom-language-types';

// eslint-disable-next-line import/prefer-default-export
export function config(): Metadata {
  return {
    metadataMaps: {
      openapi: configOpenapi,
      asyncapi: configAsyncapi,
    },
    linterFunctions: {},
  } as Metadata;
}
