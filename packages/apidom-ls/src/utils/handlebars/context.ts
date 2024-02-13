import axios from 'axios';
import mustache from 'mustache';

// eslint-disable-next-line import/order
import { AnyObject } from '../../apidom-language-types';

// eslint-disable-next-line import/no-cycle
import { defaultContext } from './default-context';

interface CacheEntry {
  context: AnyObject;
  processedContext: AnyObject;
}

function deepMergeObjects(obj1: unknown, obj2: unknown): unknown {
  if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      // For arrays, we call mergeArrayItems
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return [mergeArrayItems([...obj1, ...obj2])];
    }
    if (!Array.isArray(obj1) && !Array.isArray(obj2)) {
      // Merge two objects
      const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
      const result: { [key: string]: unknown } = {};
      keys.forEach((key) => {
        // @ts-ignore
        result[key] = deepMergeObjects(obj1[key], obj2[key]);
      });
      return result;
    }
  }
  return obj2 === undefined ? obj1 : obj2;
}

function mergeArrayItems(array: unknown[]): unknown {
  return array.reduce((prev, current) => deepMergeObjects(prev, current), {});
}

function transformJson(input: AnyObject): AnyObject {
  if (Array.isArray(input)) {
    // If the input itself is an array, start by merging its items
    return [mergeArrayItems(input)];
  }
  if (typeof input === 'object' && input !== null) {
    // If it's an object, traverse its properties
    Object.keys(input).forEach((key) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      input[key] = transformJson(input[key]);
    });
  }
  return input;
}

let currentContext: AnyObject = transformJson(defaultContext);
let currentOriginalContext: AnyObject = defaultContext;

const cache: Record<string, CacheEntry> = {}; // replace with defaultContext

export function getContext(processed?: boolean): AnyObject {
  return processed ? currentContext : currentOriginalContext;
}

export async function refreshContext(
  url: string | null,
  context?: AnyObject,
): Promise<AnyObject | null> {
  const specUrl = url || 'https://petstore3.swagger.io/api/v3/openapi.json';
  if (context) {
    currentContext = transformJson(context);
    currentOriginalContext = context;
    cache[specUrl] = {
      context: currentOriginalContext,
      processedContext: currentContext,
    };
  }
  if (specUrl && cache[specUrl]) {
    currentContext = cache[specUrl].processedContext;
    currentOriginalContext = cache[specUrl].context;
    return currentOriginalContext;
  }
  let retrievedContext = {};
  // use axios to call generator3.swagger.io and get intermediate model for given string
  try {
    const axiosData = {
      lang: 'java',
      type: 'CLIENT',
      codegenVersion: 'V3',
      specURL: specUrl,
    };
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    const res = await axios.post('http://localhost:8081/api/model', axiosData, axiosConfig);
    retrievedContext = res.data;
    currentContext = transformJson(retrievedContext);
    currentOriginalContext = retrievedContext;
    cache[specUrl] = {
      context: retrievedContext,
      processedContext: currentContext,
    };
  } catch (err) {
    console.log('error loading contex', err);
    // isParseFailure = true;
  }
  return currentOriginalContext;
}

export function renderTemplate(template: string): string {
  return mustache.render(template, getContext());
}
