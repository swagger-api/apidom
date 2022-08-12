import configAsyncapi from './asyncapi/config';
import configOpenapi from './openapi/config';
import configAds from './ads/config';
import { Metadata } from '../apidom-language-types';
import symbols from './symbols';
import tokens from './tokens';

// eslint-disable-next-line import/prefer-default-export
export function config(): Metadata {
  return {
    metadataMaps: {
      openapi: configOpenapi,
      asyncapi: configAsyncapi,
      ads: configAds,
    },
    linterFunctions: {},
    symbols,
    tokens,
  } as Metadata;
}
