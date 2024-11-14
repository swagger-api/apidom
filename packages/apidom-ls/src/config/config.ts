import configAsyncAPI from './asyncapi/config.ts';
import configOpenAPI from './openapi/config.ts';
import configADS from './ads/config.ts';
import { Metadata } from '../apidom-language-types.ts';
import symbols from './symbols.ts';
import tokens from './tokens.ts';

// eslint-disable-next-line import/prefer-default-export
export function config(): Metadata {
  return {
    metadataMaps: {
      openapi: configOpenAPI,
      asyncapi: configAsyncAPI,
      ads: configADS,
    },
    linterFunctions: {},
    symbols,
    tokens,
  } as Metadata;
}
