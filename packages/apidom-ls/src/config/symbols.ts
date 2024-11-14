import adsSymbols from './ads/symbols.ts';
import asyncapiSymbols from './asyncapi/symbols.ts';
import openapiSymbols from './openapi/symbols.ts';

// creating list of unique symbols
const symbols = Array.from(new Set([...adsSymbols, ...asyncapiSymbols, ...openapiSymbols]));

export default symbols;
