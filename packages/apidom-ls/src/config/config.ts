import configAsyncAPI from './asyncapi/config.ts';
import configOpenAPI from './openapi/config.ts';
import configADS from './ads/config.ts';
import configJSONSchema202012 from './json-schema/2020-12/config.ts';
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
    linterFunctions: {},
    symbols,
    tokens,
  } as Metadata;
}
