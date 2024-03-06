import axios from 'axios';
import mustache from 'mustache';

// eslint-disable-next-line import/order
import { AnyObject } from '../../apidom-language-types';

// eslint-disable-next-line import/no-cycle
import { defaultContext } from './default-context';
import { defaultSchema } from './default-schema';

interface CacheEntry {
  context: AnyObject;
  processedContext: AnyObject;
}

const GENERATOR_SERVICE_HOST = 'https://generator3.swagger.io';
// const GENERATOR_SERVICE_HOST = 'http://localhost:8081';

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
let currentSchema: AnyObject = defaultSchema;

const cache: Record<string, CacheEntry> = {}; // replace with defaultContext
const cacheSchema: Record<string, AnyObject> = {}; // replace with defaultContext

export function getContext(processed?: boolean): AnyObject {
  return processed ? currentContext : currentOriginalContext;
}

export function getSchema(): AnyObject {
  return currentSchema;
}

export async function refreshContext(
  url: string | null,
  mustacheContext?: AnyObject,
): Promise<AnyObject | null> {
  const specUrl = url || 'https://petstore3.swagger.io/api/v3/openapi.json';
  try {
    if (mustacheContext) {
      const contextClone = JSON.parse(JSON.stringify(mustacheContext));
      currentContext = transformJson(contextClone);
      currentOriginalContext = mustacheContext;
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
    const res = await axios.post(`${GENERATOR_SERVICE_HOST}/api/model`, axiosData, axiosConfig);
    retrievedContext = res.data;
    const contextClone = JSON.parse(JSON.stringify(retrievedContext));
    currentContext = transformJson(contextClone);
    currentOriginalContext = retrievedContext;
    cache[specUrl] = {
      context: retrievedContext,
      processedContext: currentContext,
    };
  } catch (err) {
    console.error('error loading context', err);
    // isParseFailure = true;
  }
  return currentOriginalContext;
}

export async function refreshSchema(
  url: string | null,
  schema?: AnyObject,
): Promise<AnyObject | null> {
  const specUrl = url || 'schema://openapi31';
  try {
    if (schema) {
      currentSchema = schema;
      cacheSchema[specUrl] = currentSchema;
    }
    if (specUrl && cacheSchema[specUrl]) {
      currentSchema = cacheSchema[specUrl];
      return currentSchema;
    }
    let retrievedSchema = {};
    // use axios to call url expecting a json schema
    const axiosConfig = {
      headers: {
        Accept: 'application/json',
      },
    };
    const res = await axios.get(specUrl, axiosConfig);
    retrievedSchema = res.data;
    currentSchema = retrievedSchema;
    cacheSchema[specUrl] = currentSchema;
  } catch (err) {
    console.error('error loading schema', err);
    // isParseFailure = true;
  }
  return currentSchema;
}

export function renderTemplate(template: string): string {
  return mustache.render(template, getContext());
}

export async function renderTemplateThroughService(template: string): Promise<string> {
  try {
    const axiosData = {
      context: JSON.stringify(getContext()),
      template,
    };
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    const res = await axios.post(`${GENERATOR_SERVICE_HOST}/api/render`, axiosData, axiosConfig);
    return res.data.value;
  } catch (err) {
    console.error('error rendering template', err);
    // @ts-ignore
    return `ERROR RENDERING: ${err.message}\n\n\n${template}`;
  }
}
