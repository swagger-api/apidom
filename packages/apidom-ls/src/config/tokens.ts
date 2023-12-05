import adsTokens from './ads/tokens';
import asyncapiTokens from './asyncapi/tokens';
import openapiTokens from './openapi/tokens';

// creating list of unique tokens
const tokens = Array.from(
  new Set(['value', 'string', 'number', 'key', ...adsTokens, ...asyncapiTokens, ...openapiTokens]),
);

export default tokens;
