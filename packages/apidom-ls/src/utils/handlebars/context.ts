import axios from 'axios';
import mustache from 'mustache';

// eslint-disable-next-line import/order
import { AnyObject } from '../../apidom-language-types';

// eslint-disable-next-line import/no-cycle
import { defaultContext } from './default-context';

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

const cache: Record<string, AnyObject> = {}; // replace with defaultContext

export function getContext(): AnyObject {
  return currentContext;
}

export async function refreshContext(url: string | null): Promise<AnyObject | null> {
  const specUrl = url || 'https://petstore3.swagger.io/api/v3/openapi.json';
  if (specUrl && cache[specUrl]) {
    currentContext = cache[specUrl];
    return currentContext;
  }
  let contextString = {};
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
    contextString = res.data;
    currentContext = transformJson(contextString);
    cache[specUrl] = currentContext;
    // rendered = hb.compile(mustacheTemplate)(context);
  } catch (err) {
    console.log('error loading contex', err);
    // isParseFailure = true;
  }
  return currentContext;
}

export function renderTemplate(template: string): string {
  return mustache.render(template, getContext());
}
