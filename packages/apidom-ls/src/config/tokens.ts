import adsTokens from './ads/tokens.ts';
import asyncapiTokens from './asyncapi/tokens.ts';
import openapiTokens from './openapi/tokens.ts';

// creating list of unique tokens
const tokens = Array.from(
  new Set(['value', 'string', 'number', 'key', ...adsTokens, ...asyncapiTokens, ...openapiTokens]),
);

export default tokens;
