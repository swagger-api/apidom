import configAsyncAPI from './asyncapi/config';
import configOpenAPI from './openapi/config';
import configADS from './ads/config';
import { Metadata } from '../apidom-language-types';
import symbols from './symbols';
import tokens from './tokens';

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
