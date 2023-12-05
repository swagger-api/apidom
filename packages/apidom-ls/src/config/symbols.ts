import adsSymbols from './ads/symbols';
import asyncapiSymbols from './asyncapi/symbols';
import openapiSymbols from './openapi/symbols';

// creating list of unique symbols
const symbols = Array.from(new Set([...adsSymbols, ...asyncapiSymbols, openapiSymbols]));

export default symbols;
