import configAsyncAPI from './asyncapi/config.ts';
import configOpenAPI from './openapi/config.ts';
import configADS from './ads/config.ts';
import configJSONSchema202012 from './json-schema/2020-12/config.ts';
import asyncapiReferenceMeta from './asyncapi/reference/meta.ts';
import openapiReferenceMeta from './openapi/reference/meta.ts';
import { Metadata } from '../apidom-language-types.ts';
import symbols from './symbols.ts';
import tokens from './tokens.ts';

/**
 * @public
 */
// eslint-disable-next-line import/prefer-default-export
export function config(): Metadata {
  return {
    metadataMaps: {
      openapi: configOpenAPI,
      asyncapi: configAsyncAPI,
      ads: configADS,
      'json-schema-2020-12': configJSONSchema202012,
    },
    rules: {
      asyncapi: asyncapiReferenceMeta,
      openapi: openapiReferenceMeta,
    },
    linterFunctions: {},
    symbols,
    tokens,
  } as Metadata;
}
